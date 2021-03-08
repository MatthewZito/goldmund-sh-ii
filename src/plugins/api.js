import {
  authApi as auth,
} from '@/services/api';

const apiServicePlugin = {
  install (Vue) {
    Vue.prototype.$api = {
      auth
    };
  }
};

export default apiServicePlugin;
