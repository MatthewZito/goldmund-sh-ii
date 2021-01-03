import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError, DatabaseConnError } from '@vue-forum/common';
import { User } from '@/database/models/User';

async function signup (req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  
  const { email, password } = req.body;
  
  const userExists = await User.findOne({ email });

  if (userExists) return res.send({});

  const user = User.construct({ email, password });

  try {
    await user.save();
  } catch (ex) {
    throw new DatabaseConnError();
  }

  res
    .status(201)
    .send(user);
}

export default signup;
