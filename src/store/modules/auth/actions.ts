import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import {
  AuthState,
  FirebaseAuthRequestBody,
  FirebaseSignupResponseBody,
  FirebaseSigninResponseBody,
  SavedUserAuthData
} from './types'
import UserAuthInput from '@/models/UserAuthInput'

function saveUserAuthData(userAuthData: SavedUserAuthData) {
  if (
    userAuthData.userId &&
    userAuthData.token &&
    userAuthData.tokenExpirationDate
  ) {
    localStorage.setItem('userId', userAuthData.userId)
    localStorage.setItem('token', userAuthData.token)
    localStorage.setItem('tokenExpirationDate', userAuthData.tokenExpirationDate.toString())
  }
}

function getUserAuthData(): SavedUserAuthData {
  return {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    tokenExpirationDate: +(localStorage.getItem('tokenExpirationDate') || 0)
  }
}

function clearUserAuthData() {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpirationDate')
}

let timerId: number

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
        const tokenExpirationDuration = +response.data.expiresIn * 1000
        const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration

        saveUserAuthData({
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpirationDate: tokenExpirationDate
        })

        timerId = setTimeout(() => {
          context.dispatch('autoLogout')
        }, tokenExpirationDuration)

        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken
        } as AuthState)

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

    if (
      userAuthData.token &&
      userAuthData.userId &&
      userAuthData.tokenExpirationDate
    ) {
      const tokenExpirationDate =
        userAuthData.tokenExpirationDate - new Date().getTime()

      if (tokenExpirationDate < 0) {
        return
      } else {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          context.dispatch('autoLogout')
        }, tokenExpirationDate)

        context.commit('setUser', {
          userId: userAuthData.userId,
          token: userAuthData.token
        } as AuthState)
      }
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
        // const tokenExpirationDuration = 5000 --> for testing auto logout
        const tokenExpirationDuration = +response.data.expiresIn * 1000
        const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration

        saveUserAuthData({
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpirationDate: tokenExpirationDate
        })

        timerId = setTimeout(() => {
          context.dispatch('autoLogout')
        }, tokenExpirationDuration)

        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken
        } as AuthState)

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
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
  logout(context) {
    clearUserAuthData()
    clearTimeout(timerId)

    context.commit('setUser', {
      userId: null,
      token: null
    } as AuthState)
  }
}

export default authActions