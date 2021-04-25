import { createWebHistory, createRouter }  from 'vue-router';

import routes from '@/router/routes';
import { globalBefore } from './guards';

/* Root Router Configurations */

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(globalBefore);

export default router;
