import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

// TODO fix, get dev env with vercel dev
const isDev = import.meta.env.LOCAL || import.meta.env.DEV;
const baseUrl = import.meta.env.VITE_LOCAL
  ? 'http://localhost:3000'
  : import.meta.env.VITE_APP_URL_UI;

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {
  submitComm (data, cb) {
    return client.post({
      url: import.meta.env.VITE_APP_API_SUBMIT_COMM,
      data
    }, cb);
  }
};
