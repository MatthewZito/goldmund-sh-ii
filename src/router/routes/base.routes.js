export default [{
  path: '/',
  name: 'Landing',
  component: () => import('@/views/Landing.vue'),
  meta: {
    cache: true,
    label: 'pwd'
  }
},
// {
//   path: '/archive',
//   name: 'Archive',
//   component: () => import('@/views/Archive.vue'),
//   meta: {
//     cache: true,
//     label: 'history'
//   }
// },
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
