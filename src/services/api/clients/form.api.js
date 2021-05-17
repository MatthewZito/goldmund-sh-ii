import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

// TODO fix, get dev env with vercel dev
import { isDev, baseUrl } from '@/utils';
import { C_MESSAGE } from '@/services/api/models';

const url = import.meta.env.VITE_APP_API_GRAPHQL;

const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {
  submitComm (data, cb) {
    return client.post({
      url,
      data: C_MESSAGE(data)
    }, cb);
  }
};
