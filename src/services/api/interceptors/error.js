import { objNotEmpty } from '@/utils';
import normalize from '../normalizers';

const data = null;
const ok = false;

export default function (error) {
  if (!objNotEmpty(error.response)) {
    return normalize({
      ok,
      status: 499,
      error: 'Request cancelled',
      data
    });
  }
  return normalize({
    ok,
    status: error.response.status,
    error: error.response?.data?.message || 'An error occurred while processing the request',
    data
  });
}
