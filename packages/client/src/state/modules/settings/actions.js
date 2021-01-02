export const updateSettings = ({ commit, state }, key, value) => {
  if (!state.hasOwnProperty(key)) return; // eslint-disable-line no-prototype-builtins
  commit('updateSettings', { key, value });
};

export const toggleDrawer = ({ commit }) => {
  commit('toggleDrawer');
};

export const setDrawer = ({ commit }, bool) => {
  commit('setDrawer', bool);
};

export const addViewToCache = ({ commit, state }, view) => {
  if (state.viewCache.includes(view.name) || !view.meta.cache) return;
  commit('addViewToCache', view);
};

export const removeViewFromCache = ({ commit }, view) => {
  commit('removeViewFromCache', view);
};

export const purgeViewCache = ({ commit }) => {
  commit('purgeViewCache');
};
