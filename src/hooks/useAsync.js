import { not } from 'js-heuristics';
import { ref, shallowRef } from 'vue';

import { noop } from '@/utils';

export {
  useAsync
};

/**
 * Reactive async state for @/services/api
 * Syncs reactive state to promise resolution
 * @param executor The promise to be resolved
 * @param opts
 */
function useAsync (executor, { onError = noop } = {}) {
  const state = shallowRef({});
  const isLoading = ref(true);
  const error = ref(undefined);

  async function execute () {
    try {
      const { data, ok, error } = await executor();

      if (not(ok)) throw new Error(error);

      state.value = data;

    } catch (ex) {
      error.value = ex;
      onError(ex);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    state,
    isLoading,
    error,
    execute
  };
}
