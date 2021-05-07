/**
 * @summary Cancel all pending requests for which a cancel token has been issued
 */
export const cancelPendingRequests = ({ state, dispatch }) => {
  state.cancelTokens.forEach(request => {
    if (request.cancel) request.cancel();
  });

  dispatch('purgeCancelTokens');
};

/**
 * @summary Persist a cancel token for a given request
 */
export const addCancelToken = ({ commit }, token) => {
  commit('addCancelToken', token);
};

/**
 * @summary Purge all persisted cancel tokens
 */
export const purgeCancelTokens = ({ commit }) => {
  commit('purgeCancelTokens');
};
