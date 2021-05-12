import { HttpClient } from 'http-factory';

import {
  request,
  response,
  error
} from '../interceptors';

// TODO fix, get dev env with vercel dev
import { isDev, baseUrl } from '@/utils';
import { CONTACT_FORM } from '@/data/enums';


const client = new HttpClient()
  .intercepts({ request, response, error })
  .logs({ request: isDev, response: isDev })
  .setBaseUrl(baseUrl);

export default {
  submitComm (data, cb) {
    return client.post({
      url: import.meta.env.VITE_APP_API_SUBMIT_COMM,
      data: CONTACT_FORM(data)
    }, cb);
  }
};
