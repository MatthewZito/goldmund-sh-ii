import axios from 'axios';
import state from '@/state';

function interceptRequest (config) {
  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  state.dispatch('http/addCancelToken', source);

  return config;
}

export default interceptRequest;
