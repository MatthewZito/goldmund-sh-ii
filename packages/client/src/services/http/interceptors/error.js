function interceptError (error) {
  if (!error.response) {
    return {
      ok: false,
      status: 499,
      message: 'Request cancelled',
      errors: Object.freeze([].concat(error.response.data.errors)),
      data: null
    };
  }
  return error;
}

export default interceptError;
