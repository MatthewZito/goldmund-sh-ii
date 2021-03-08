import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from '@/router/routes';
import { globalBefore } from './guards';

import { noop } from '@/utils';

// silence those nasty nav duplicated exceptions
const ctx = VueRouter.prototype.push;

VueRouter.prototype.push = function push (loc) {
  return ctx
    .call(this, loc)
    .catch(noop);
};

Vue.use(VueRouter);

/* Root Router Configurations */
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(globalBefore);

export default router;
