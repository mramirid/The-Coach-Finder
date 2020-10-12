import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import {
  AuthState,
  FirebaseAuthResponseBody,
  FirebaseAuthRequestBody
} from './types'
import UserAuthInput from '@/models/UserAuthInput'

const authActions: ActionTree<AuthState, RootState> = {
  async signup(context, userAuthInput: UserAuthInput) {
    try {
      const response = await axios.post<FirebaseAuthResponseBody>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_KEY}`,
        {
          email: userAuthInput.email,
          password: userAuthInput.password,
          returnSecureToken: true
        } as FirebaseAuthRequestBody
      )

      if (response.status < 400) {
        context.commit('setUser', response.data)
      } else {
        throw new Error('Failed to signup');
      }

    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          throw new Error("The email is already in use by another account");
        default:
          throw error;
      }
    }
  },
  async login() {
    // Later...
  }
}

export default authActions