import axios from 'axios';
import store from '@/state';

export default async function (config) {
  // generate and attach cancel token to ea. request
  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  await store.dispatch('api/addCancelToken', source);

  return config;
}
