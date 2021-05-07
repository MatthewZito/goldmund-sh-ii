import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

console.log('FIXME');

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: true, response: true })
  .setBaseUrl('http://locahost:3000'/* import.meta.env.VITE_APP_URL_UI */);

export default {
  submitComm (data, cb) {
    return client.post({
      url: import.meta.env.VITE_APP_API_SUBMIT_COMM,
      data
    }, cb);
  }
};
