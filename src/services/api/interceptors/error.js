import normalize from "../normalizers";

export default function (error) {
  if (error.response && error.response.status === 401) {
    return normalize({
      error: 'Invalid permissions',
      status: error.response.status
    });
  }
  return normalize({
    status: error.response?.status || 400
  });
}
