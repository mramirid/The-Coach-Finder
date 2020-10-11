import { ActionTree } from 'vuex'
import axios from 'axios'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import Coach from '@/models/Coach'

const counterActions: ActionTree<CoachesState, RootState> = {
  async registerCoach(context, coach: Coach) {
    const coachId = context.rootGetters.currentUserId

    const response = await axios.put<Coach>(
      `${process.env.VUE_APP_FIREBASE_URL}coaches/${coachId}.json`, coach
    )

    if (response.statusText === "OK") {
      coach.id = coachId
      context.commit('registerCoach', coach)
    } else {
      throw new Error("Could not save data");
    }
  }
}

export default counterActions