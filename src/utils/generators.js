export {
  generateRoutingTable,
  sidebarRoutesFilter
};

/**
 * @description Generate a routing table using a unique filter
 * @param {function} filter Function with which to filter routes
 * @param {array} routes An array of Vue route objects
 */
function generateRoutingTable (filter, routes) {
  return filter(routes);
}

/**
 * @description Recurse routes and ensure all routes & children meet the predicate/condition
 * @param {function} predicate A conditional fn for determining which routes to filter *out*; must return a Boolean
 */
function createRouteFilter (predicate) {
  return function partial (routes) {
    const flattened = [];

    routes.forEach(route => {
      const tmp = { ...route };
      if (predicate(tmp)) {
        if (tmp.children) {
          tmp.children = partial(tmp.children);
        }
        flattened.push(tmp);
      }
    });
    return flattened;
  };
}

/**
 * @description Filters all routes & children, removing all without the `sidebar` prop set to `true`
 */
function sidebarRoutesFilter (routes) {
  const sidebarFilter = createRouteFilter(hasSidebarRoute);
  const includesSidebar = sidebarFilter(routes);
  const onlySidebar = includesSidebar.map(resolveTopLevelSidebar);
  return onlySidebar.flat();
}

/* Helpers / Partial Application Utils */
function hasSidebarRoute (route) {
  // some versions of IE do not support `hasOwnProperty`
  return (Object.prototype.hasOwnProperty.call(route, 'meta') && route.meta.sidebar) ||
  (route.children && route.children.some(child => child.meta.sidebar));
}

function resolveTopLevelSidebar (routes) {
  if (routes.meta.sidebar) {
    return routes;
  }
  return routes.children.filter(child => child.meta.sidebar);
}
