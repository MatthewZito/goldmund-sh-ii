import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

/* Dedicated Vuex Store for API Service Metadata */
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state: () => state
};
// find cancel token implementation in here - cancel tokens abort requests
