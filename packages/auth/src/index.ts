/* Base Dependencies */
import express from 'express';
import 'express-async-errors'; // catch thrown errors in async handlers
import { json } from 'body-parser';
import { init as initializeMongo } from './database';

/* Transitive Dependencies */
import { ErrorNormalizer, NotFoundError } from '@vue-forum/common';

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

/* Fallback */
app.all('*', () => { throw new NotFoundError(); });

/* Middlewares */

// will catch all thrown errors, even those in async fns
app.use(ErrorNormalizer); 

/****************************
 * 
 * Server Runtime Conf
 * 
 ****************************/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
}); // TODO replace w/PM2

// initialize db conn
initializeMongo();