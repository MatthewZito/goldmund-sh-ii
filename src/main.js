/* Core Deps */
import { createApp } from 'vue';
import router from '@/router';
import store from '@/state';

import App from './App.vue';

/* Local Plugins */
import apiServicePlugin from '@/plugins/api';

/* Global Components */
import fa from '@/plugins/fontAwesome';

/* Global Error Handlers */
import debug from '@/utils/debug';

/************************************
 *
 * Root Vue Instance Configurations
 *
 ************************************/

const app = createApp(App)
  .use(router)
  .use(store)
  /* Plugins */
  .use(apiServicePlugin);

/************************************
 *
 * Root / Global Configurations
 *
 ************************************/

/* Global Components */
app.component('FontAwesomeIcon', fa());

/* Debug */
debug.call(app);

/*************************************
 *
 * App / Vue Instance Initialization
 *
 *************************************/
app.mount('#app');
