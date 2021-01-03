import express from 'express';
import { signin } from '../../controllers/users';

const router = express.Router();

router.post(
  '/users/signin',
  signin
);

export { 
  router as signinRouter
};
console.log()