export default () => ({
  ...cacheState(),
  appName: require('@pkg').appName,
  appAuthor: require('@pkg').author
});

export function cacheState () {
  return {
    cachedViews: []
  };
}
