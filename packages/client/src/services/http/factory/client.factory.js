import BaseClient from './base.factory';

class HTTPClient extends BaseClient {
  constructor (config) {
    super({ opts: config });
  }

  get (url, cb) {
    return this.client({
      method: 'get',
      url
    }).then(cb)
      .catch(cb);
  }

  post (url, data, cb) {
    return this.client({
      method: 'post',
      url,
      data
    }).then(cb)
      .catch(cb);
  }
}

export default HTTPClient;
