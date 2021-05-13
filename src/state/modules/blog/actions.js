import { not } from "js-heuristics";

import { blogApi } from '@/services/api';

/**
 * @summary Fetch blog posts metadata
 */
export const fetchPosts = async ({ state, commit }) => {
  if (not(state.posts.length)) {
    await blogApi.fetchPosts(({ ok, data }) => {
      if (ok) commit('updatePosts', data.Posts);
    });
  }
};
