export default [{
  path: '/blog/:slug',
  name: 'Blog',
  component: () => import('@/views/BlogPost.vue'),
  props: route => ({
    ...route.params
  }),
  meta: {
    cache: true,
    label: 'cat'
  }
}];
