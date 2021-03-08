/* Routes Modules */
import baseRoutes from './base.routes';

export default [
  ...baseRoutes,
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/PageNotFound.vue'),
    meta: {
      authRequired: true
    }
  }
];
