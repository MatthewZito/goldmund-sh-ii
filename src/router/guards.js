import { predicate } from '@/router/helpers';
import NProgress from '@/plugins/progress';

export {
  guards
};

function guards () {
  this.beforeEach((to, from, next) => {
    NProgress.start();
    const routeHas = predicate(to);

    if (routeHas('redirect')) {
      return next({ name: 'Landing' });
    }

    return next();
  });

  this.afterEach(() => {
    NProgress.done();
  });
}
