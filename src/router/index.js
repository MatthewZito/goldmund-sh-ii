import { createWebHistory, createRouter }  from 'vue-router';

import routes from '@/router/routes';
import { guards } from './guards';

/* Root Router Configurations */

const router = createRouter({
  history: createWebHistory(),
  routes
});

guards.call(router);

export default router;
