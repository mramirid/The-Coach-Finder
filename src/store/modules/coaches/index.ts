import { Module } from 'vuex'

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import coachesGetters from './getters'
import coachesMutations from './mutations'
import coachesActions from './actions'

function getCoachesState(): CoachesState {
  return {
    userIsCoach: false,
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30
      }
    ]
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