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
export const rmViewFromCache = ({ commit }, view) => {
  commit('rmViewFromCache', view);
};

/**
 * @description Invalidate entire view cache
 */
export const purgeCachedViews = ({ commit }) => {
  commit('purgeCachedViews');
};

/**
 * @description Reset Config state to defaults
 */
export const resetState = ({ commit }) => {
  commit('resetState');
};