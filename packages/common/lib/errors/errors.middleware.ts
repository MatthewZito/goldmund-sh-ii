import { 
  Request, 
  Response, 
  NextFunction 
} from 'express';

import { SystemError } from './models/Base';
/**
 * Normalizes errors into a consistent format and sends said format in a 400 response
 * @param err Any error thrown in the controller to which this middleware has been applied
 * @param req Express request object, inbound
 * @param res Express response object, inbound
 * @param next Callback
 */
export const ErrorNormalizer = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction // eslint-disable-line no-unused-vars
) => {
  if (err instanceof SystemError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serialize() });
  }

  res
    .status(400)
    .send({ errors: [{ message: err.message }] });
};