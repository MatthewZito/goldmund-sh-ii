import { not } from 'js-heuristics';
import normalize from '../normalizers';

export default function (response) {
  if (isErroneous(response)) {
    return normalize({
      status: response.status,
      error: response?.data?.message
    });
  }
  return normalize({
    ok: true,
    status: response.status,
    data: response.data.Data,
    error: null
  });
}

function isErroneous ({ status = 900, data } = {}) {
  return not(status < 300 && status >= 200) ||
    not(data.Data);
}
