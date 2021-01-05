import BaseOkResponse from './factory/BaseOkResponse';

class ResourceCreatedResponse extends BaseOkResponse {
  statusCode = 201;
  constructor (public payload: { payload: any }) { // eslint-disable-line no-unused-vars
    super();
  }

  serialize () {
    return {
      payload: this.payload
    };
  }
}

export default ResourceCreatedResponse;
