import initState from './state';

export const toggleNavDrawer = (state) => {
  state.isNavDrawerOpen = !state.isNavDrawerOpen;
};

export const setNavDrawer = (state, bool) => {
  state.isNavDrawerOpen = bool;
};

export const addViewToCache = (state, view) => {
  if (state.cachedViews.includes(view.name)) return;
  if (view.meta.cache) {
    state.cachedViews.push(view.name);
  }
};

export const rmViewFromCache = (state, view) => {
  const idx = state.cachedViews.indexOf(view.name);
  idx > -1 && state.cachedViews.splice(idx, 1);
};

export const purgeCachedViews = (state) => {
  state.cachedViews = [];
};

export const resetState = (state) => {
  Object.assign(state, initState());
};
