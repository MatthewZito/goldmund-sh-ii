/* Core Deps */
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/state';

/* Core CSS */
import './plugins/quasar';
import './styles/index.scss';

/* Local Plugins */
import apiServicePlugin from '@/plugins/api';

/* Global Components */
import '@/components/common/_globalRegistrar';

/* Settings */
import { appName } from '../package.json';
const logF = (...args) => process.env.NODE_ENV !== 'production' && console.log(`[${appName}]`, ...args); // eslint-disable-line no-console

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

window.onerror = function (message, source, line, column, error) {
  logF(`Uncaught Exception: ${message}\nInfo: ${source} - Ln${line} Col${column}`);
};

Vue.config.errorHandler = function (err, vm, info) {
  logF(`ERROR: ${err.toString()}\nInfo: ${info}`, err);
};

Vue.config.warnHandler = function (msg, vm, trace) {
  logF(`WARN: ${msg}\nTrace: ${trace}`);
};

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
