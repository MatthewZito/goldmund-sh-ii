export default [{
  path: '/',
  name: 'Landing',
  component: () => import('@/views/Landing.vue'),
  meta: {
    cache: true,
    label: 'pwd'
  }
},
{
  path: '/communications',
  name: 'Communications',
  component: () => import('@/views/Communications.vue'),
  meta: {
    cache: true,
    label: 'ping'
  }
},
{
  path: '/info',
  name: 'Information',
  component: () => import('@/views/Information.vue'),
  meta: {
    cache: true,
    label: 'man'
  }
}];
