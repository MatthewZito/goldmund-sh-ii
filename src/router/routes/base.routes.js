export default [{
  path: '/',
  name: 'Landing',
  component: require('@/views/Landing.vue').default,
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
},
{
  path: '/pubkey',
  name: 'Pubkey',
  component: () => import('@/views/Pubkey.vue'),
  meta: {
    cache: true,
    label: 'gpg --import'
  }
}];
