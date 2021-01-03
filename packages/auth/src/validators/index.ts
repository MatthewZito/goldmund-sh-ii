import { body } from 'express-validator';
import conf from './conf';

const { min, max } = conf.password;

const signinValidators = [1];

const signupValidators = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .trim()
    .isLength({ 
      min, 
      max
    })
    .withMessage(`Password must be between ${min} and ${max} characters`)
];

export {
  signinValidators,
  signupValidators
};