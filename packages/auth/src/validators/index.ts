import { body } from 'express-validator';
import conf from './conf';

/* Validator Configurations */

const { min, max } = conf.password;

const signinValidators = [1];

/* Signup Router */
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