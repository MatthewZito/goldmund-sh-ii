import { Request, Response } from 'express';

import {
  DatabaseConnError,
  BadRequestError,
  ResourceCreatedResponse
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
    throw new BadRequestError(`Email ${email} is already in use`);
  }

  const newUser = User.construct({
    email,
    password
  });

  try {
    await newUser.save();
  } catch (ex) {
    throw new DatabaseConnError();
  }

  const userAuthToken = generateJwt({
    id: newUser.id,
    email: newUser.email
  });

  const response = new ResourceCreatedResponse({ payload: newUser});

  const resource = {
    ...response,
    token: userAuthToken
  };

  res
    .status(resource.statusCode)
    .send(resource);
}

export default register;
