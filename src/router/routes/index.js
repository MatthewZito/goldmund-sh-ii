/* Routes Modules */
import baseRoutes from './base.routes';
import blogRoutes from './blog.routes';

export default [
  ...baseRoutes,
  ...blogRoutes,
  {
    path: '*',
    name: 'NotFound',
    redirect: '/'
  }
];
