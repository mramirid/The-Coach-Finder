import { MutationTree } from 'vuex'

import { RequestsState } from './types'
import Request from '@/models/Request'

const requestsMutations: MutationTree<RequestsState> = {
  addRequest(state, newRequest: Request) {
    state.requests.push(newRequest)
  }
}

export default requestsMutations