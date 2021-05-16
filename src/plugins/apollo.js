import { DefaultApolloClient } from '@vue/apollo-composable';

import client from '@/services/apollo';

export default {
  install (app, opts) {
    app.provide(
      DefaultApolloClient,
      client
    );
  }
};
