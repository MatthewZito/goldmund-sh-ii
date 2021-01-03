import { SystemError } from './Base';

export class BadRequestError extends SystemError {
  statusCode = 400;
  reason = 'Unable to initialize database connection';
  constructor (public message: string) { // eslint-disable-line no-unused-vars
    super(new Date () + ' ERROR:REQ:MALFORMED:');
     
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize () {
    return [
      { message: this.message }
    ];
  }
}