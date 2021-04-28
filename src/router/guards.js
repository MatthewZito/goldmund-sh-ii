import { predicate } from '@/router/helpers';

async function globalBefore (to, from, next) {
  const routeHas = predicate(to);

  if (routeHas('redirect')) {
    return next({ name: 'Landing' });
  }

  return next();
}

export {
  globalBefore
};
