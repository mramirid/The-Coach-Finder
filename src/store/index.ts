import { createStore } from 'vuex'

import { RootState } from './types'
import rootGetters from './getters';
import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

function getRootState(): RootState {
  return {
    currentUserId: 'u1'
  }
}

export default createStore<RootState>({
  state: getRootState,
  getters: rootGetters,
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  }
})