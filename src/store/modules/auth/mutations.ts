import { MutationTree } from 'vuex'

import { AuthState } from './types'
import { FirebaseAuthResponseBody } from './types'

const authMutations: MutationTree<AuthState> = {
  setUser(state, response: FirebaseAuthResponseBody) {
    state.userId = response.localId
    state.token = response.idToken
    state.tokenExpiration = response.expiresIn
  }
}

export default authMutations