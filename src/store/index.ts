import { createStore } from 'vuex'

import { RootState } from './types'
import coachesModule from './modules/coaches/index';
import rootGetters from './getters';

function getRootState(): RootState {
  return {
    currentUserId: 'u1'
  }
}

export default createStore<RootState>({
  state: getRootState,
  getters: rootGetters,
  modules: {
    coaches: coachesModule
  }
})