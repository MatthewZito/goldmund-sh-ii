import express from 'express';

import { ValidateRequest } from '@vue-forum/common/middlewares';

import { loginValidators } from '@/validators';
import { login } from '@/controllers/users';

const loginRouter = express.Router();

loginRouter.post(
  '/users/login',
  loginValidators,
  ValidateRequest,
  login
);

export default loginRouter;
