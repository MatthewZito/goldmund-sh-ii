import {
  formApi as form
} from '@/services/api';

export default {
  install (app, opts) {
    const api = {
      form
    };
    app.config.globalProperties.$api = api;
    app.provide('$api', api);
  }
};
