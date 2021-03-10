export default [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      cache: true,
      sidebar: true,
      label: 'Main',
      icon: 'mdi-home'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    meta: {
      cache: true,
      sidebar: true,
      label: 'Blog',
      icon: 'mdi-view-dashboard'
    },
    children: [{
      path: ':slug',
      name: 'Article',
      component: () => import('@/views/Blog.vue'),
      meta: {
        cache: true,
        sidebar: false
      },
    }]
  }
];
