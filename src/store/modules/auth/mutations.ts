import { MutationTree } from 'vuex'

import { AuthState } from './types'

const authMutations: MutationTree<AuthState> = {
  setUser(state, userAuthData: AuthState) {
    state.userId = userAuthData.userId
    state.token = userAuthData.token
    state.didAutoLogout = false
  },
  setAutoLogout(state) {
    state.didAutoLogout = true
  }
}

export default authMutations