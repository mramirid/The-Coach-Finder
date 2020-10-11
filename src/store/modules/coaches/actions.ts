import { ActionTree } from 'vuex'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import Coach from '@/models/Coach'

const counterActions: ActionTree<CoachesState, RootState> = {
  registerCoach(context, coach: Coach) {
    coach.id = context.rootGetters.currentUserId
    context.commit('registerCoach', coach)
  }
}

export default counterActions