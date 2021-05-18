import { not, objNotEmpty } from 'js-heuristics';
import normalize from '../normalizers';

export default function (response) {
  if (isErroneous(response)) {
    return normalize({
      status: response.status,
      error: response?.data?.errors[0]?.message || 'An error occurred while processing the request'
    });
  }
  return normalize({
    ok: true,
    status: response.status,
    data: response.data.data,
    error: null
  });
}

function isErroneous ({ status = 900, data } = {}) {
  return not(status === 200)
    || not(objNotEmpty(data?.data))
    || !!data?.errors?.length;
}
