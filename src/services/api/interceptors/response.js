import normalize from '../normalizers';

export default function (response) {
  if (response.status === 200) {
    return normalize({
      ok: true,
      status: response.status,
      data: response.data
    });
  }
  console.log(response);
  return response;
}
