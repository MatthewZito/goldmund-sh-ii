import {
  articlesApi as articles
} from '@/services/api';

export default {
  install (Vue) {
    Vue.prototype.$api = {
      articles
    };
  }
};
