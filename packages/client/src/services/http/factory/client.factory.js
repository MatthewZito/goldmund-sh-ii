import BaseClient from './base.factory';

class HTTPClient extends BaseClient {
  constructor (config) {
    super({ opts: config });
  }

  get ({url, headers }, cb) {
    return this.client({
      method: 'get',
      headers,
      url
    }).then(cb)
      .catch(cb);
  }

  post ({ url, headers, data }, cb) {
    return this.client({
      method: 'post',
      url,
      headers,
      data
    }).then(cb)
      .catch(cb);
  }
}

export default HTTPClient;
