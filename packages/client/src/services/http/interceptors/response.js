function interceptResponse (response) {
  return {
    ok: true,
    status: response.status,
    message: null,
    data: [].concat(response.data || [])
  };
}

export default interceptResponse;
