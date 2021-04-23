/* Routes Modules */
import baseRoutes from './base.routes';

export default [
  ...baseRoutes,
  {
    path: '*',
    name: 'NotFound',
    redirect: '/'
  }
];
