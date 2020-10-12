import { MutationTree } from 'vuex'

import { AuthState } from './types'
import { SetUserMutationPayload } from './types'

const authMutations: MutationTree<AuthState> = {
  setUser(state, payload: SetUserMutationPayload) {
    state.userId = payload.userId
    state.token = payload.token
    state.tokenExpiration = payload.tokenExpiration
  }
}

export default authMutations