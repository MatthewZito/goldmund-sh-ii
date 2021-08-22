import { not, objNotEmpty } from "js-heuristics";

import { blogApi, eventApi } from '@/services/api';
import { ERROR_CAT } from '@/services/api/models';

import { dispatchRoot } from '@/state/helpers';

/**
 * @summary Fetch blog posts metadata
 */
export const fetchPosts = async ({ state, commit, dispatch }) => {
  const ipc = dispatchRoot(dispatch);

  if (not(state.posts?.length)) {
    await blogApi.fetchPosts(({ ok, data, error }) => {
      if (ok && objNotEmpty(data)) {
        commit('updatePosts', data.payload);
      } else {
        ipc('notifications/addNotification', {
          type: 'error',
          message: 'An error occurred while loading the site'
        })
          .finally(() => {
            eventApi.logError({
              category: ERROR_CAT.HTTP,
              info: error
            });
        });
      }
    });
  }
};
