import { Request, Response } from 'express';

import {
  DatabaseConnErr,
  BadRequest,
  ResourceCreated
} from '@vue-forum/common/models';

import { User } from '@/database';
import { generateJwt } from '@/utils';

/**
 * @summary Handler for user login
 */
async function register (req: Request, res: Response) {
  const { email, password } = req.body;
  // TODO check uname
  const userExists = await User.findOne({
    email
  });

  if (userExists) {
    throw new BadRequest(`Email ${email} is already in use`);
  }

  const newUser = User.construct({
    email,
    password
  });

  try {
    await newUser.save();
  } catch (ex) {
    throw new DatabaseConnErr();
  }

  const userAuthToken = await generateJwt({
    id: newUser.id,
    email: newUser.email
  });

  const response = new ResourceCreated(newUser);

  res
    .status(response.statusCode)
    .send(Object.assign(response.serialize(), { token: userAuthToken }));
}

export default register;
