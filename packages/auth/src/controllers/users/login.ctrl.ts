import { Request, Response } from 'express';

import {
  AuthOkResponse,
  BadRequestError
} from '@vue-forum/common/models';

import { User } from '@/database';
import CryptUtil from '@/utils/CryptUtil';

import { generateJwt } from '@/utils';

async function login (req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email
  });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const compare = await CryptUtil.compare(
    existingUser.password,
    password
  );

  if (!compare) {
    throw new BadRequestError('Invalid credentials');
  }

  const token = await generateJwt({
    email,
    id: existingUser.id
  });

  const response = new AuthOkResponse(token);

  res
    .status(response.statusCode)
    .send(response);
}

export default login;
