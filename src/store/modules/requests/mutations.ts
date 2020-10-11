import { MutationTree } from 'vuex'

import { RequestsState } from './types'
import Request from '@/models/Request'

const requestsMutations: MutationTree<RequestsState> = {
  addRequest(state, newRequest: Request) {
    state.requests.push(newRequest)
  },
  setRequests(state, requests: Request[]) {
    state.requests = requests
  }
}

export default requestsMutations