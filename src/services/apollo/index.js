import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core';

const link = createHttpLink({
  url: import.meta.env.VITE_APP_API_GRAPHQL
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache
});
