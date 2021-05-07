export const addCancelToken = (state, token) => {
  state.cancelTokens.push(token);
};

export const purgeCancelTokens = (state) => {
  state.cancelTokens = [];
};
