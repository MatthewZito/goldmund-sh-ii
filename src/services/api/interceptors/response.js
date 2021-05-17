import { not } from 'js-heuristics';
import normalize from '@/services/api/normalizers';

export default function (response) {
  if (isErroneous(response)) {
    return normalize({
      status: response.status,
      error: response?.errors[0]
    });
  }
  return normalize({
    ok: true,
    status: response.status,
    data: response.data,
    error: null
  });
}

function isErroneous ({ status = 900, data, errors } = {}) {
  return not(status >= 200 && status < 300)
    || not(data.length)
    || !!errors.length;
}
