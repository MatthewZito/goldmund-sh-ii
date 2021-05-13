import { not } from 'js-heuristics';

import { baseUrl, blobify } from '@/utils';
import { EVENT_LOG } from '@/services/api/models';

export default {
  client: navigator,

  logEvent (data) {
    // not supported
    if (not(navigator.sendBeacon)) return;

    return this.client.sendBeacon(
      baseUrl + import.meta.env.VITE_APP_API_LOG_EVENT,
      blobify(EVENT_LOG(data))
    );
  }
};
