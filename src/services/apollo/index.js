import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core';
// instead of using adapters, the apollo devs included the whole fucking entirety of react here,
// even if you don't need it - importing /core will bypass this

import { baseUrl, isDev } from '@/utils';

const uri = baseUrl + import.meta.env.VITE_APP_API_GRAPHQL;

const link = createHttpLink({
  uri
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: isDev
});

export * from './queries';

export * from './mutations';
