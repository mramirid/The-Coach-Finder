import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import Coach from '@/models/Coach'

const coachesGetters: GetterTree<CoachesState, RootState> = {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_, getters, __, rootGetters) {
    const coaches = getters.coaches as Coach[]
    const userId = rootGetters.currentUserId as string
    return coaches.some(coach => coach.id === userId)
  },
  shouldUpdate(state) {
    if (!state.lastFetch) {
      return true
    } else {
      const currentTimestamp = new Date().getTime()
      return ((currentTimestamp - state.lastFetch) / 1000) > 60
    }
  }
}

export default coachesGetters