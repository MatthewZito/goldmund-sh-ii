export const addCancelToken = ({ commit }, token) => {
  commit('addCancelToken', token);
};

export const cancelPendingRequests = ({ commit, state }) => {
  state.cancelTokens.forEach(request => {
    if (request.cancel) request.cancel();
  });

  commit('purgeCancelTokens');
};
