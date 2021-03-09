import HttpClient from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: true, response: true })
  .setBaseUrl('http://localhost:5000');

export default {
  fetchAll (cb) {
    return client.get({ url: '/entries' }, cb);
  }
};
