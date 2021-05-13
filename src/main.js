/* Core Deps */
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import router from '@/router';
import store from '@/state';

import App from './App.vue';

/* Global Components */
import fa from '@/plugins/icon';
import BlogContainer from '@/components/blog/BlogContainer.vue';
import BlogPostCard from '@/components/blog/BlogPostCard.vue';

/* Global Error Handlers */
import debug from '@/plugins/debug';

/* Providers */
import api from '@/plugins/api';

/************************************
 *
 * Root Vue Instance Configurations
 *
 ************************************/
const app = createApp(App)
  .use(debug)
  .use(api)
  .use(router)
  .use(store)
  .use(createHead());

/************************************
 *
 * Root / Global Configurations
 *
 ************************************/

/* Global Components */
app.component('FAIcon', fa());
app.component('BlogContainer', BlogContainer);
app.component('BlogPostCard', BlogPostCard);

/*************************************
 *
 * App / Vue Instance Initialization
 *
 *************************************/
app.mount('#app');
