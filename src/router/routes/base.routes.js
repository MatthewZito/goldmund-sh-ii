export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Landing.vue'),
    meta: {
      authRequired: true,
      cache: true,
      sidebar: true,
      label: 'Home',
      icon: 'mdi-home'
    }
  }
];
