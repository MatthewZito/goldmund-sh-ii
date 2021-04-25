import pkg from '@pkg';

const { appName, appAuthor } = pkg;

export default () => ({
  isNavDrawerOpen: false,
  ...cacheState(),
  appName,
  appAuthor
});

export function cacheState () {
  return {
    cachedViews: []
  };
}
