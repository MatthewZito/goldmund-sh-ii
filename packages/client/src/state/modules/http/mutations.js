export const addCancelToken = (state, token) => {
  const newState = [
    ...state.cancelTokens,
    token
  ];

  Object.assign({}, state, { cancelTokens: newState });
};

export const purgeCancelTokens = (state) => {
  Object.assign({}, state, { cancelTokens: [] });
};
