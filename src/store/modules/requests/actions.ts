import { ActionTree } from "vuex"

import { RootState } from '@/store/types'
import { RequestsState } from './types'
import Request from '@/models/Request'

const requestsActions: ActionTree<RequestsState, RootState> = {
  contactCoach(context, newRequest: Request) {
    newRequest.id = new Date().toISOString()
    context.commit('addRequest', newRequest)
  }
}

export default requestsActions