import { EVENT_TYPES, ERROR_CAT } from './types';
import {
  GET_POST,
  GET_POSTS,
  CREATE_EVENT,
  CREATE_MESSAGE
} from '@/services/graphql';


const FETCH_POSTS = _ => ({
  query: GET_POSTS,
  variables: {}
});

const FETCH_POST = ({ slug }) =>
({
  query: GET_POST,
  variables: {
    slug
  }
});

/**
 * @summary Resolve arguments into a `createEvent` mutation
 */
const ERROR_EVENT = ({
  type = EVENT_TYPES.ERROR,
  category = ERROR_CAT.LOGGING,
  info = 'model mismatch'
} = {}) =>
({
  query: CREATE_EVENT,
  variables: {
    type,
    category,
    info
  }
});

const INTERACTION_EVENT = ({
  type = EVENT_TYPES.INTERACTION,
  category = 'analytics'
} = {}) => {
  const info = JSON.stringify({
    referrer: document.referrer,
    location: window.location.href,
    ua: navigator.userAgent,
    platform: navigator.platform
  });

  return {
    query: CREATE_EVENT,
    variables: {
      type,
      category,
      info
    }
  };
};

const C_MESSAGE = ({ email, subject, body }) =>
({
  query: CREATE_MESSAGE,
  variables: {
    email,
    subject,
    body
  }
});

export {
  FETCH_POST,
  FETCH_POSTS,
  ERROR_EVENT,
  INTERACTION_EVENT,
  C_MESSAGE
};
