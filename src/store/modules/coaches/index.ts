import { Module } from 'vuex'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import coachesGetters from './getters'
import coachesMutations from './mutations'
import coachesActions from './actions'

function getCoachesState(): CoachesState {
  return {
    lastFetch: null,
    userIsCoach: false,
    coaches: []
  }
}

const coachesModule: Module<CoachesState, RootState> = {
  namespaced: true,
  state: getCoachesState,
  getters: coachesGetters,
  mutations: coachesMutations,
  actions: coachesActions
}

export default coachesModule