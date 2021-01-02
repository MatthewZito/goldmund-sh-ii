import { body } from 'express-validator';

const conf = {
  password: {
    min: 8,
    max: 30
  }
};

const signinValidators = [1];

const signupValidators = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .trim()
    .isLength({ 
      min: conf.password.min, 
      max: conf.password.max 
    })
    .withMessage(`Password must be between ${conf.password.min} and ${conf.password.max} characters`)
];



export {
  signinValidators,
  signupValidators
};