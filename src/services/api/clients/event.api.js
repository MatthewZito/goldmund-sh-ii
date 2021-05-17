import { not } from 'js-heuristics';

import { baseUrl, blobify } from '@/utils';
import { EVENT_LOG } from '@/services/api/models';

export default {
  client: navigator,

  logEvent (data) {
    // not supported
    if (not(navigator.sendBeacon)) return;
    // we don't really care if these go through and especially do not want to force the users
    // to wait for something they did not ask for, and thus send the mutation manually via `sendBeacon`
    return this.client.sendBeacon(
      baseUrl + import.meta.env.VITE_APP_API_GRAPHQL,
      blobify(EVENT_LOG(data))
    );
  }
};
