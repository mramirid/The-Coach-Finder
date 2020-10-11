import { Module } from 'vuex'

import { RequestsState } from './types'
import { RootState } from '@/store/types'
import requestsGetters from './getters'
import requestsMutations from './mutations'
import requestsActions from './actions'

function getRequestsState(): RequestsState {
  return {
    requests: []
  }
}

const requestsModule: Module<RequestsState, RootState> = {
  namespaced: true,
  state: getRequestsState,
  getters: requestsGetters,
  mutations: requestsMutations,
  actions: requestsActions
}

export default requestsModule