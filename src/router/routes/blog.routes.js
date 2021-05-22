export default [{
  path: '/blog/:slug',
  name: 'Blog',
  component: () => import('@/components/blog/BlogContainer.vue'),
  props: true,
  meta: {
    cache: true,
    label: 'cat'
  }
}];
