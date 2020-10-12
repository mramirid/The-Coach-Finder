import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import Coach from '@/models/Coach'

type FirebaseRawCoaches = {
  [id: string]: Coach;
}

const counterActions: ActionTree<CoachesState, RootState> = {
  async registerCoach(context, coach: Coach) {
    const coachId = context.rootGetters['auth/currentUserId'] as string

    const response = await axios.put<Coach>(
      `${process.env.VUE_APP_FIREBASE_URL}coaches/${coachId}.json`, coach
    )

    if (response.statusText === "OK") {
      coach.id = coachId
      context.commit('registerCoach', coach)
    } else {
      throw new Error("Could not save data");
    }
  },
  async loadCoaches(context, refreshClicked: boolean) {
    if (!refreshClicked && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get<FirebaseRawCoaches>(
      `${process.env.VUE_APP_FIREBASE_URL}coaches.json`
    )

    if (response.statusText === "OK") {
      const coaches = Object.keys(response.data).map<Coach>(key => {
        response.data[key].id = key
        return response.data[key];
      })
      context.commit('setCoaches', coaches)
      context.commit('setFetchTimestamp')
    } else {
      throw new Error("Could not fetch all data");
    }
  }
}

export default counterActions