import { objNotEmpty } from '@/utils';
import normalize from '../normalizers';

export default function (error) {
  if (!objNotEmpty(error.response)) {
    return normalize({
      status: 499,
      error: 'Request cancelled'
    });
  }
  return normalize({
    status: error.response.status,
    error: error.response?.data?.message
  });
}
