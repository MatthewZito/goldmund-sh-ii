import { EVENT_TYPES } from './types';

const EVENT_LOG = ({
  type = EVENT_TYPES.ERROR,
  category = 'logging_error',
  info = 'model mismatch'
} = {}) =>
({
  type,
  category,
  info
});

const CONTACT_FORM = ({
  email = 'none',
  subject = 'none',
  message = 'none'
} = {}) =>
({
  email,
  subject,
  message
});

export {
  EVENT_LOG,
  CONTACT_FORM
};
