import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError, DatabaseConnectionError } from '@vue-forum/common';

function signup (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  
  const { email, password } = req.body;
  // TODO subclass error and bind errors arr thereon
  res.send({});

}

export default signup;
