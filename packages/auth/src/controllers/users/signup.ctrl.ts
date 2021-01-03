import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { 
  RequestValidationError, 
  DatabaseConnError, 
  BadRequestError 
} from '@vue-forum/common';

import { User } from '@/database/models/User';

/**
 * @summary Handler for user sign-up
 */
async function signup (req: Request, res: Response) {
  // validation error objects, as captured by the express-validator middleware
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  
  const { email, password } = req.body;
  // TODO check uname
  const userExists = await User.findOne({ email });

  if (userExists) throw new BadRequestError(`Email ${email} is already in use`);

  const newUser = User.construct({ email, password });

  try {
    await newUser.save();
  } catch (ex) {
    throw new DatabaseConnError();
  }
  
  res
    .status(201)
    .send(newUser);
}

export default signup;
