import { 
  Request, 
  Response, 
  NextFunction 
} from 'express';

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