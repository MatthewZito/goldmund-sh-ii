import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

// TODO fix, get dev env with vercel dev
import { isDev, baseUrl } from '@/utils';


const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {
  fetchPost (data, cb) {
    return client.post({
      url: import.meta.env.VITE_APP_API_GET_POST,
      data
    }, cb);
  },

  fetchPosts (cb) {
    return client.get({
      url: import.meta.env.VITE_APP_API_GET_POSTS
    }, cb);
  }
};
