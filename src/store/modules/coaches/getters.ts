import { GetterTree } from "vuex";

import { RootState } from '@/store/types';
import { CoachesState } from "./types";

const coachesGetters: GetterTree<CoachesState, RootState> = {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  }
}

export default coachesGetters