import express from 'express';
import { signout } from '../../controllers/users';

const router = express.Router();

router.post(
  '/users/signout',
  signout
);

export { 
  router as signoutRouter
};
