import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './state';

const settingsStore = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: () => state
};

export default settingsStore;
