import { not, objNotEmpty } from 'js-heuristics';

import normalize from '../normalizers';

export default function (error) {
  if (not(objNotEmpty(error?.response))) {
    return normalize({
      status: 499,
      error: 'Request cancelled'
    });
  }
  return normalize({
    status: error.response.status,
    error: error.response?.data?.errors[0] || 'An error occurred while processing the request'
  });
}
