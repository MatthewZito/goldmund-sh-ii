import {
  formApi as form,
  eventApi as event,
  blogApi as blog
} from '@/services/api';

export default {
  install (app, opts) {
    const api = {
      form,
      event,
      blog
    };

    app.config.globalProperties.$api = api;
    app.provide('$api', api);
  }
};
