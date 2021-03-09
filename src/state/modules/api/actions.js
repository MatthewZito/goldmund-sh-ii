export const cancelPendingRequests = ({ state, dispatch }) => {
  state.cancelTokens.forEach((request) => {
    if (request.cancel) request.cancel();
  });

  dispatch('purgeCancelTokens');
};

export const addCancelToken = ({ commit }, token) => {
  commit('addCancelToken', token);
};

export const purgeCancelTokens = ({ commit }) => {
  commit('purgeCancelTokens');
};
