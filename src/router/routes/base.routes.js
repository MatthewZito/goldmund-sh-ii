export default [{
  path: '/',
  name: 'Landing',
  component: () => import('@/views/Landing.vue'),
  meta: {
    cache: true,
    sidebar: true,
    label: 'Main',
    icon: 'mdi-home'
  }
}];
