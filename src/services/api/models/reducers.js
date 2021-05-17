import { EVENT_TYPES } from './types';
import { CREATE_EVENT } from '@/services/apollo/mutations';

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

export {
  EVENT_LOG
};
