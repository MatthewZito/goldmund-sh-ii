import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';
import { FETCH_POST, FETCH_POSTS } from '../models';

// TODO fix, get dev env with vercel dev
import { isDev, baseUrl } from '@/utils';

const url = import.meta.env.VITE_APP_API_GRAPHQL;

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {

  /**
   * @summary Fetch a single post
   */
  fetchPost (data, cb) {
    return client.post({
      url,
      data: FETCH_POST(data)
    }, cb);
  },

  /**
   * @summary Fetch all posts
   */
  fetchPosts (cb) {
    return client.post({
      url,
      data: FETCH_POSTS()
    }, cb);
  }
};
