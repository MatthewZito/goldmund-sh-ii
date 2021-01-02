import { 
  Request, 
  Response, 
  NextFunction 
} from 'express';

/**
 * Normalizes errors into a consistent format and sends said format in a 400 response
 * @param err Any error thrown in the controller to which this middleware has been applied
 * @param req Express request object, inbound
 * @param res Express response object, inbound
 * @param next Callback
 */
export const errorNormalizer = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  res
    .status(400)
    .send({
      message: err.message
    });
};