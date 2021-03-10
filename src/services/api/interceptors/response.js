import normalize from '../normalizers';

export default function (response) {
  if (rsOk(response)) {
    return normalize({
      ok: true,
      status: response.status,
      data: response.data
    });
  }
  return normalize({
    ok: false,
    status: response.status,
    data: null,
    error: response?.data?.message || 'An error occurred while processing the request',
  });
}

function rsOk ({ status }) {
  return status === 200 ||
    status === 201 ||
    status === 204;
}
