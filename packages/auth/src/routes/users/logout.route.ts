import express from 'express';
import { logout } from '@/controllers/users';

const logoutRouter = express.Router();

logoutRouter.post(
  '/users/logout',
  logout
);

export default logoutRouter;
