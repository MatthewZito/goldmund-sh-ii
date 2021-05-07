import { createStore } from 'vuex';

import config from './modules/config';
import api from './modules/api';
import notifications from './modules/notifications';

export default createStore({
  modules: {
    /* UI State and Configurations */
    config,
    /* Notifications Dispatch Service*/
    notifications,
    /* API Cancellation Service */
    api
  },
  strict: process.env.NODE_ENV !== 'production'
});
