import express from 'express';

import {
  CurrentUser,
  RequireAuthorization
} from '@vue-forum/common/middlewares';

import { renew } from '@/controllers/users';

const renewRouter = express.Router();

renewRouter.post(
  '/users/renew',
  CurrentUser,
  RequireAuthorization,
  renew
);

export default renewRouter;


