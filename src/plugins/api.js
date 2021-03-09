import {
  entriesApi as entries
} from '@/services/api';

export default  {
  install (Vue) {
    Vue.prototype.$api = {
      entries
    };
  }
};
