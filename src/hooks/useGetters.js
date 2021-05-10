import store from '@/state';
import { computed } from 'vue';

export {
  useGetters
};

function useGetters (namespace, getters) {
  return getters.reduce((getters, getter) => {
    getters[getter] = computed(() => store.getters[`${namespace}/${getter}`]);
    return getters;
  }, {});
}
