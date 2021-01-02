/* Base Dependencies */
import express from 'express';
import { json } from 'body-parser';

/* Transitive Dependencies */
import { errorNormalizer } from '@lan-monitor/common';

/* Router Configurations */
import {
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes/users';

/****************************
 * 
 * Server Configurations
 * 
 ****************************/

const PORT = process.env.PORT || 5000;

const app = express();
app.use(json());

/* Router Associations */
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/* Middlewares */
app.use(errorNormalizer);

/****************************
 * 
 * Server Runtime Conf
 * 
 ****************************/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
