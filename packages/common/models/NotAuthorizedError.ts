import BaseError from './factory/BaseError';

/**
 * Denotes a request for a restricted resource to which the requester does not have access
 */
class NotAuthorizedError extends BaseError {
  statusCode = 401;
  constructor () {
    super(new Date () + ' ERROR:REQ:NOT_AUTHORIZED:');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize () {
    return [
      { message: 'Not authorized' }
    ];
  }
}

export default NotAuthorizedError;
