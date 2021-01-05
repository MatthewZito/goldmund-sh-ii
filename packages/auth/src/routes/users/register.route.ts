import express from 'express';

import { ValidateRequest } from '@vue-forum/common/middlewares';

import { registerValidators } from '@/validators';
import { register } from '@/controllers';

const registerRouter = express.Router();

registerRouter.post(
  '/users/register',
  registerValidators,
  ValidateRequest,
  register
);

export default registerRouter;
