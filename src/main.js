/* Core Deps */
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/state';

/* Core CSS (sass-loader) */

/* Local Plugins */
import apiServicePlugin from '@/plugins/api';

/* Global Components */
import '@/components/common/_globalRegistrar';
import '@/plugins/fontAwesome';

/* Global Error Handlers */
import debug from '@/utils/debug';

/************************************
 *
 * Root Vue Instance Configurations
 *
 ************************************/

/* Plugins */
Vue.use(apiServicePlugin);

/* Vue Global API Config */
Vue.config.productionTip = false;

/************************************
 *
 * Root / Global Error Capturing
 *
 ************************************/

debug.call(Vue);

/*************************************
 *
 * App / Vue Instance Initialization
 *
 *************************************/

const vm = new Vue({
  router,
  store,
  render: h => h(App)
});

vm.$mount('#app');
