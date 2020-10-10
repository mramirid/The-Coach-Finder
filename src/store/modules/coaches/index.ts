import { Module } from 'vuex'
import { uuid } from "vue-uuid";

import { RootState } from '@/store/types'
import { CoachesState } from './types'
import coachesGetters from './getters'
import coachesMutations from './mutations'
import coachesActions from './actions'

function getCoachesState(): CoachesState {
  return {
    coaches: [
      {
        id: uuid.v4(),
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: uuid.v4(),
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