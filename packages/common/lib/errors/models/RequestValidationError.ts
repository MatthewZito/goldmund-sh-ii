import { ValidationError } from 'express-validator';
import { SystemError } from './Base';

export class RequestValidationError extends SystemError {
  statusCode = 400;
  constructor (private errors: ValidationError[]) { // eslint-disable-line no-unused-vars
    super(new Date () + ' ERROR:REQ:VALIDATION');
    
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize () {
    return this.errors.map(e => ({
      message: e.msg,
      field: e.param
    }));
  }
}