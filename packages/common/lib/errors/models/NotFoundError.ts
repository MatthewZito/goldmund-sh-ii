import { SystemError } from './Base';

export class NotFoundError extends SystemError {
  statusCode = 404;
  constructor () {
    super(new Date () + ' ERROR:REQ:NOT_FOUND');
    
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize () {
    return [{ message: 'Path not found' }];
  }
}