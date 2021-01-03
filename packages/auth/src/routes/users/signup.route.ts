import express from 'express';
import { signupValidators } from '../../validators';
import { signup } from '../../controllers/users';

const router = express.Router();

router.post(
  '/users/signup',
  signupValidators,
  signup
);

export { 
  router as signupRouter 
};