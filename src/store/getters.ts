import { GetterTree } from "vuex";

import { RootState } from '@/store/types';

const rootGetters: GetterTree<RootState, RootState> = {
  currentUserId(state) {
    return state.currentUserId
  }
}

export default rootGetters