/* eslint-disable no-console */
import Vue from 'vue';
import App from './App.vue';

/* Root UI Configurations */
import './plugins/quasar';
import '@/components/common/_globals';

/* Plugins */
import store from './state';
import router from './router';

import iLocalStorage from '@/services/iLocalStorage';

/***********************************
 *
 * Global Vue Configurations
 *
 ***********************************/

/* Global Vue Conf */
Vue.config.productionTip = false;

/* Plugins */
Vue.use(iLocalStorage);

/***********************************
 *
 * Global Error Captures
 *
 ***********************************/

window.onerror = (msg, src, ln, col, err) => { // eslint-disable-line no-unused-vars
  if (store.getters['settings/isLoggerOn']('errors')) {
    const printF = 'color: #ff5555; font-weight: bold';
    console.log('%c [GLOBAL:ERROR]', printF, `${msg}\n${src, ln, col}`);
  }
};

Vue.config.errorHandler = (err, vm, info) => {
  if (store.getters['settings/isLoggerOn']('errors')) {
    const printF = 'color: #ff5555; font-weight: bold';
    console.log('%c [GLOBAL:ERROR]', printF, `${err.toString()}\n${info}`);
  }
};

Vue.config.warnHandler = (msg, vm, trace) => {
  if (store.getters['settings/isLoggerOn']('warnings')) {
    const printF = 'color: #f1fa8c; font-weight: bold';
    console.log('%c [GLOBAL:WARN]', printF, `${msg}\n${trace}`);
  }
};

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
