/**
 * Returns a locale-specific logger setting
 * @param {string} locale The logger locale to be retrieved
 * @returns Boolean
 */
export const isLoggerOn = state => locale => state.logger[locale];

export const getAppName = state => state.title;

export const getAppVersion = state => state.version;

export const getAppMetadata = (state, getters) => ({
  title: getters.getAppName,
  version: getters.getAppVersion
});

export const isDrawerOpen = state => state.drawerState;

export const getCachedViews = state => state.viewCache;
