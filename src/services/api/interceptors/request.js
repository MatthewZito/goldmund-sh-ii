import { CancelToken } from 'http-factory';
import store from '@/state';

export default async function (config) {
  // generate and attach cancel token to ea. request
  const source = CancelToken.source();
  config.cancelToken = source.token;
  await store.dispatch('api/addCancelToken', source);

  return config;
}
