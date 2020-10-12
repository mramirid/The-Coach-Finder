import { Module } from 'vuex'

import { RootState } from '@/store/types'
import { AuthState } from './types'
import authGetters from './getters'
import authMutations from './mutations'
import authActions from './actions'

function getAuthState(): AuthState {
  return {
    userId: null,
    token: null,
    tokenExpiration: null,
  }
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: getAuthState,
  getters: authGetters,
  mutations: authMutations,
  actions: authActions
}

export default authModule