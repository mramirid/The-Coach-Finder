import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import {
  AuthState,
  FirebaseAuthRequestBody,
  FirebaseSignupResponseBody,
  FirebaseSigninResponseBody
} from './types'
import UserAuthInput from '@/models/UserAuthInput'

function saveUserAuthData(userAuthData: AuthState) {
  localStorage.setItem('userId', userAuthData.userId || '')
  localStorage.setItem('token', userAuthData.token || '')
  localStorage.setItem('tokenExpiration', userAuthData.tokenExpiration || '')
}

function getUserAuthData(): AuthState {
  return {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    tokenExpiration: localStorage.getItem('tokenExpiration')
  }
}

function clearUserAuthData() {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiration')
}

const authActions: ActionTree<AuthState, RootState> = {
  async signup(context, userAuthInput: UserAuthInput) {
    try {
      const response = await axios.post<FirebaseSignupResponseBody>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_KEY}`,
        {
          email: userAuthInput.email,
          password: userAuthInput.password,
          returnSecureToken: true
        } as FirebaseAuthRequestBody
      )

      if (response.status < 400) {
        const userAuthData: AuthState = {
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.expiresIn
        }
        saveUserAuthData(userAuthData)
        context.commit('setUser', userAuthData)
      } else {
        throw new Error('Failed to signup')
      }

    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          throw new Error('The email is already in use by another account')
        default:
          throw error
      }
    }
  },
  tryAutoLogin(context) {
    const userAuthData = getUserAuthData()
    if (userAuthData.token && userAuthData.userId) {
      context.commit('setUser', userAuthData)
    }
  },
  async login(context, userAuthInput: UserAuthInput) {
    try {
      const response = await axios.post<FirebaseSigninResponseBody>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_KEY}`,
        {
          email: userAuthInput.email,
          password: userAuthInput.password,
          returnSecureToken: true
        } as FirebaseAuthRequestBody
      )

      if (response.status < 400) {
        const userAuthData: AuthState = {
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.expiresIn
        }
        saveUserAuthData(userAuthData)
        context.commit('setUser', userAuthData)
      } else {
        throw new Error('Failed to login')
      }

    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_NOT_FOUND':
          throw new Error('There is no user registered with that email address')
        case 'INVALID_PASSWORD':
          throw new Error('The password is invalid')
        case 'USER_DISABLED':
          throw new Error('The user account has been disabled by an administrator')
        default:
          throw error
      }
    }
  },
  logout(context) {
    clearUserAuthData()
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    } as AuthState)
  }
}

export default authActions