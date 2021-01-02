export const updateSettings = (state, { key, value }) => {
  state[key] = value;
};

export const toggleDrawer = (state) => {
  state.drawerState = !state.drawerState;
};

export const setDrawer = (state, bool) => {
  state.drawerState = bool;
};

export const addViewToCache = (state, view) => {
  state.viewCache.push(view.name);
};

export const removeViewFromCache = (state, view) => {
  const idx = state.viewCache.indexOf(view.name);
  idx > -1 && state.viewCache.splice(idx, 1);
};

export const purgeViewCache = state => {
  state.viewCache = [];
};
