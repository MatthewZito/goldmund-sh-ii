import { typeChecks } from '@/utils/heuristics';

/* Local Storage Interface */

const JSON_REGEX = new RegExp(/[\[\{].*[\}\]]/); // eslint-disable-line no-useless-escape

const iLocalStorage = {
  getItem (key) {
    const v = localStorage.getItem(key);
    return v && JSON_REGEX.test(v) ? JSON.parse(v) : v;
  },
  setItem (key, item) {
    localStorage.setItem(key, typeChecks.isObject(item) ? JSON.stringify(item) : item);
  }
};

export default {
  install (Vue) {
    Vue.prototype.$storage = this;
    Vue.storage = this;
  },
  ...iLocalStorage
};

export {
  iLocalStorage
};
