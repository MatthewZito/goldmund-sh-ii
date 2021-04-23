import {
  blogApi as blog
} from '@/services/api';

export default {
  install (Vue) {
    Vue.prototype.$api = {
      blog
    };
  }
};
