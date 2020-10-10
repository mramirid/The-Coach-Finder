import { createStore } from 'vuex'

import { RootState } from './types'
import coachesModule from './modules/coaches/index';

export default createStore<RootState>({
  modules: {
    coaches: coachesModule
  }
})