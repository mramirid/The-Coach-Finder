import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { AuthState } from './types'

const authGetters: GetterTree<AuthState, RootState> = {
  currentUserId(state) {
    return state.userId
  }
}

export default authGetters