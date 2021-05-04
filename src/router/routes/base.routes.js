export default [{
  path: '/',
  name: 'Landing',
  component: () => import('@/views/Landing.vue'),
  meta: {
    cache: true,
    label: 'pwd',
    desc: 'a blog about computing, programming, art, and...'
  }
},
{
  path: '/communications',
  name: 'Communications',
  component: () => import('@/views/Communications.vue'),
  meta: {
    cache: true,
    label: 'ping',
    desc: 'get in touch'
  }
},
{
  path: '/info',
  name: 'Information',
  component: () => import('@/views/Information.vue'),
  meta: {
    cache: true,
    label: 'man',
    desc: 'about a random blog'
  }
}];
