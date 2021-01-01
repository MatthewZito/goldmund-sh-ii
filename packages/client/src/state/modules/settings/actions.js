export const updateSettings = ({ commit, state }, key, value) => {
  if (!state.hasOwnProperty(key)) return; // eslint-disable-line no-prototype-builtins
  commit('updateSettings', { key, value });
};
