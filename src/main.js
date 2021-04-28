/* Core Deps */
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import router from '@/router';
import store from '@/state';

import App from './App.vue';

/* Global Styles */
import '@/plugins/prism';

/* Global Components */
import fa from '@/plugins/icon';
import Container from '@/views/Container.vue';
import BlogPostCard from '@/components/blog/BlogPostCard.vue';

/* Global Error Handlers */
import debug from '@/plugins/debug';

/************************************
 *
 * Root Vue Instance Configurations
 *
 ************************************/
const app = createApp(App)
  .use(debug)
  .use(router)
  .use(store)
  .use(createHead());

/************************************
 *
 * Root / Global Configurations
 *
 ************************************/

/* Global Components */
app.component('FontAwesomeIcon', fa());
app.component('Container', Container);
app.component('BlogPostCard', BlogPostCard);

/*************************************
 *
 * App / Vue Instance Initialization
 *
 *************************************/
app.mount('#app');
