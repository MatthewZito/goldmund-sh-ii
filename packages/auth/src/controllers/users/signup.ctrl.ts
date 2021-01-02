import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

function signup (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new Error();

  const { email, password } = req.body;
  // TODO subclass error and bind errors arr thereon
  res.send({});

}

export default signup;
