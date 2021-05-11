import { not } from 'js-heuristics';
import { baseUrl, blobify } from '@/utils';

export default {
  client: navigator,

  logEvent (data) {
    // not supported
    if (not(navigator.sendBeacon)) return;

    return this.client.sendBeacon(
      baseUrl + import.meta.env.VITE_APP_API_LOG_EVENT,
      blobify(Object.assign(data, { time: new Date() }))
    );
  }
};
