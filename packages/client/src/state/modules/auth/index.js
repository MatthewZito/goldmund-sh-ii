import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './state';

const authStore = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: () => state
};

export default authStore;
