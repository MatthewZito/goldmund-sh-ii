export const cancelPendingRequests = (context) => {
  // cancel all requests on which a cancel token exists
  context.state.cancelTokens.forEach((request) => {
    if (request.cancel) {
      request.cancel();
    }
  });
  // reset cancel token cache
  context.commit('purgeCancelTokens');
};
