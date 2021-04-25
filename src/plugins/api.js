import {
  blogApi as blog
} from '@/services/api';

export default {
  install (app, options) {
    const api = {
      blog
    };
    app.config.globalProperties.$api = api;
    app.provide('$api', api);
  }

};
