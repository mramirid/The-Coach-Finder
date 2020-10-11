import { MutationTree } from 'vuex'

import Coach from '@/models/Coach'
import { CoachesState } from './types'

const coachesMutations: MutationTree<CoachesState> = {
  registerCoach(state, coach: Coach) {
    state.coaches.push(coach)
  },
  setCoaches(state, coaches: Coach[]) {
    state.coaches = coaches
  }
}

export default coachesMutations