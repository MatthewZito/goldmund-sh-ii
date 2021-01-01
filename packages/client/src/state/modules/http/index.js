import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './state';

/* Dedicated module for handling http service metadata */
const httpStore = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: () => state
};

export default httpStore;
