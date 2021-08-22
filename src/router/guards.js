import { not } from 'js-heuristics';

import store from '@/state';
import NProgress from '@/plugins/progress';
import { SessionManager } from '@/services/sessions';
import { eventApi } from '@/services/api';

import { predicate } from '@/router/helpers';

export {
  guards
};

const session = new SessionManager();

/**
 * @summary Wrapper for all system navigation guards
 */
function guards () {
  this.beforeEach((to, from, next) => {
    const routeHas = predicate(to);

    if (not(session.tracking())) {
      session.track();
      eventApi.logInteraction();
    }

    NProgress.start();

    // cancel all pending requests for which a cancellation token has been issued
    // we don't want the api call to proceed if the user has exited
    store.dispatch('api/cancelPendingRequests');

    if (routeHas('redirect')) {
      return next({ name: 'Landing' });
    }

    return next();
  });

  this.afterEach(() => {
    NProgress.done();
  });

  return this;
}
