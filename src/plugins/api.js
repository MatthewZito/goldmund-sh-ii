import {
  formApi as form,
  eventApi as event
} from '@/services/api';

export default {
  install (app, opts) {
    const api = {
      form,
      event
    };
    app.config.globalProperties.$api = api;
    app.provide('$api', api);
  }
};
