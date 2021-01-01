import Vue from 'vue';
import App from './App.vue';

/* Plugins */
import store from './state';
import router from './router';

/* Root CSS and Stylesheets */
import './plugins/quasar';

/* Global Vue Configurations */
Vue.config.productionTip = false;


/***********************************
 *
 * Root Vue Instance Initialization
 *
 ***********************************/

const root = new Vue({
  store,
  router,
  render: h => h(App)
});

root.$mount('#app');
