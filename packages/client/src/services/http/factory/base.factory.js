import axios from 'axios';

class BaseClient {
  constructor ({ opts }) {
    if (this.constructor === BaseClient) {
      throw new TypeError(`${this.constructor.name} is an abstract class and cannot be instantiated directly`);
    }
    this.client = axios.create(opts);
  }

  intercepts ({ request, response, error }) {
    this.client.interceptors.request.use(request);
    this.client.interceptors.response.use(response, error);

    return this;
  }

  transforms ({ request, response }) {
    this.client.defaults.transformRequest = request;
    this.client.defaults.transformResponse = response;

    return this;
  }
}

export default BaseClient;
