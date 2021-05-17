import { EVENT_TYPES } from './types';
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
const EVENT_LOG = ({
  type = EVENT_TYPES.ERROR,
  category = 'logging_error',
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
  EVENT_LOG,
  C_MESSAGE
};
