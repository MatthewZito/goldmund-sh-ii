import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '@/services/api/interceptors';
import { FETCH_POST, FETCH_POSTS } from '@/services/api/models';

// TODO fix, get dev env with vercel dev
import { isDev, baseUrl } from '@/utils';

const url = import.meta.env.VITE_APP_API_GRAPHQL;

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {
  fetchPost (data, cb) {
    return client.post({
      url,
      data: FETCH_POST(data)
    }, cb);
  },

  fetchPosts (cb) {
    return client.post({
      url,
      data: FETCH_POSTS()
    }, cb);
  }
};
