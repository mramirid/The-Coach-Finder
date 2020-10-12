import { MutationTree } from 'vuex'

import { AuthState } from './types'
import { SetUserMutationPayload } from './types'

const authMutations: MutationTree<AuthState> = {
  setUser(state, firebaseAuthResponse: SetUserMutationPayload) {
    state = firebaseAuthResponse
  }
}

export default authMutations