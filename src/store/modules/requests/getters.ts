import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { RequestsState } from './types'

const requestsGetters: GetterTree<RequestsState, RootState> = {
  requests(state, _, __, rootGetters) {
    return state.requests.filter((coach) => {
      return coach.coachId === rootGetters.currentUserId
    })
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0
  }
}

export default requestsGetters