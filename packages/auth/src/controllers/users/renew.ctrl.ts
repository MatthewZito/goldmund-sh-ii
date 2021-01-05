import { Request, Response } from 'express';

import { NotAuthorizedError, AuthOkResponse } from '@vue-forum/common/models';

import generateJwt from '@/utils/generateJwt';

async function renew (req: Request, res: Response) {
  if (!req.currentUser?.email || !req.currentUser.id) {
    throw new NotAuthorizedError();
  }

  const { email, id } = req.currentUser;

  const token = await generateJwt({
    email,
    id
  });

  const response = new AuthOkResponse(token);

  res
    .status(response.statusCode)
    .send(response);
}

export default renew;
