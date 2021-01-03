import { SystemError } from './Base';

export class DatabaseConnError extends SystemError {
  statusCode = 500;
  reason = 'Unable to initialize database connection';
  constructor () {
    super(new Date () + ' ERROR:DATABASE:CONN');
     
    Object.setPrototypeOf(this, DatabaseConnError.prototype);
  }

  serialize () {
    return [
      { message: this.reason }
    ];
  }
}