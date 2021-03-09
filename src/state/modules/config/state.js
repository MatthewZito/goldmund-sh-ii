export default () => ({
  isNavDrawerOpen: false,
  ...cacheState(),
  appName: require('@pkg').appName,
  appAuthor: require('@pkg').author
});

export function cacheState () {
  return {
    cachedViews: []
  };
}
