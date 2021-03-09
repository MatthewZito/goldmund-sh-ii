/**
 * @description Toggle the nav drawer state via negation
 */
 export const toggleNavDrawer = ({ commit }) => {
  commit('toggleNavDrawer');
};

/**
 * @description Explicitly set the nav drawer state
 * @param {boolean} bool The Boolean value to which the nav drawer state will be set
 */
export const setNavDrawer = ({ commit }, bool) => {
  commit('setNavDrawer', bool);
};

/**
 * @description Add Vue Router route object to cache list, to be used by keep-alive
 * @param {object} view The Vue Router object to be cached
 */
export const addViewToCache = ({ commit }, view) => {
  commit('addViewToCache', view);
};

/**
 * @description Remove Vue Router route object from cache list
 * @param {object} view The Vue Router object to be cache-invalidated
 */
export const removeViewFromCache = ({ commit }, view) => {
  commit('removeViewFromCache', view);
};

/**
 * @description Invalidate entire view cache
 */
export const resetViewCache = ({ commit }) => {
  commit('resetViewCache');
};

/**
 * @description Reset Config state to defaults
 */
export const resetState = ({ commit }) => {
  commit('resetState');
};
