import {
  Request,
  Response,
  NextFunction
} from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../models/';

/**
 * Validates request body parameters
 */
const ValidateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation error objects, as captured by the express-validator middleware
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export default ValidateRequest;
