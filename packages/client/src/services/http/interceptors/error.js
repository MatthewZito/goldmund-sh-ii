function interceptError (error) {
  if (!error.response) {
    return {
      ok: false,
      status: 499,
      message: 'Request cancelled',
      data: null
    };
  }
  return error;
}

export default interceptError;
