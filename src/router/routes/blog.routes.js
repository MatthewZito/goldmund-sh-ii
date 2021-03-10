export default [{
  path: '/blog',
  name: 'Blog',
  component: () => import('@/views/Blog.vue'),
  meta: {
    cache: false,
    sidebar: true,
    label: 'Blog',
    icon: 'mdi-view-dashboard'
  }
},
{
  path: '/blog/:slug',
  name: 'Article',
  component: () => import('@/views/Article.vue'),
  meta: {
    cache: true,
    sidebar: false
  },
  props: route => ({
    ...route.params
  })
}];
