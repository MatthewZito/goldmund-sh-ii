import store from '@/state';

async function globalBefore (to, from, next) {
  const routeHas = predicate(to);
  store.dispatch('api/cancelPendingRequests');
  return next();
}

export {
  globalBefore
};

/* Helpers */
function predicate (to) {
  return function (test) {
    return to.matched.some(record => record.meta[test]);
  };
}
