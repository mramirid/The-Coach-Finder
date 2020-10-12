import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import {
  AuthState,
  FirebaseAuthRequestBody,
  FirebaseSignupResponseBody,
  FirebaseSigninResponseBody,
  SetUserMutationPayload
} from './types'
import UserAuthInput from '@/models/UserAuthInput'

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
        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.expiresIn
        } as SetUserMutationPayload)
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
        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.expiresIn
        } as SetUserMutationPayload)
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
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    } as SetUserMutationPayload)
  }
}

export default authActions