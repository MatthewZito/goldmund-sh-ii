export default [{
  path: '/',
  name: 'Landing',
  component: () => import('@/views/Landing.vue'),
  meta: {
    cache: true,
    label: 'pwd',
    desc: 'A blog about computing, programming, art, music'
  }
},
{
  path: '/communications',
  name: 'Communications',
  component: () => import('@/views/Communications.vue'),
  meta: {
    cache: true,
    label: 'ping',
    desc: 'Get in touch with the admin'
  }
},
{
  path: '/info',
  name: 'Information',
  component: () => import('@/views/Information.vue'),
  meta: {
    cache: true,
    label: 'man',
    desc: 'About this website and its admin'
  }
}];
