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
    data: response.data,
    error: null
  });
}

function isErroneous ({ status }) {
  return status && !(status < 300 && status >= 200);
}
