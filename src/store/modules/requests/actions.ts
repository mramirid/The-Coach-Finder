import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import { RequestsState } from './types'
import Request from '@/models/Request'

type FirebasePostResponse = { name: string }

type FirebaseRawRequests = {
  [id: string]: {
    email: string;
    message: string;
  };
}

const requestsActions: ActionTree<RequestsState, RootState> = {
  async contactCoach(context, newRequest: Request) {
    const response = await axios.post<FirebasePostResponse>(
      `${process.env.VUE_APP_FIREBASE_URL}requests/${newRequest.coachId}.json`,
      {
        email: newRequest.email,
        message: newRequest.message
      }
    )

    if (response.statusText === "OK") {
      newRequest.id = response.data.name
      context.commit('addRequest', newRequest)
    } else {
      throw new Error("Could not send request");
    }
  },
  async fetchRequests(context) {
    const currentUserId = context.rootGetters['auth/currentUserId'] as string
    const response = await axios.get<FirebaseRawRequests>(
      `${process.env.VUE_APP_FIREBASE_URL}requests/${currentUserId}.json`
    )

    if (response.statusText === "OK") {
      let requests: Request[] = []
      if (response.data) {
        requests = Object.keys(response.data).map<Request>(key => {
          return {
            id: key,
            coachId: currentUserId,
            email: response.data[key].email,
            message: response.data[key].message
          };
        })
      }
      context.commit('setRequests', requests)
    } else {
      throw new Error("Could not fetch requests");
    }
  }
}

export default requestsActions