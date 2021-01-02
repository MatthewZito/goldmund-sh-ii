import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

function signin (req: Request, res: Response) {
  const { email, password } = req.body;

}

export default signin;
