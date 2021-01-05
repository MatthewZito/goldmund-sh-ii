import BaseOkResponse from './factory/BaseOkResponse';

class AuthOkResponse extends BaseOkResponse {
  statusCode = 200;
  constructor (public token: string) { // eslint-disable-line no-unused-vars
    super();
  }

  serialize () {
    return {
      token: this.token
    };
  }
}

export default AuthOkResponse;
