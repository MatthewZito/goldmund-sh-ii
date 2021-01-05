/****************************
 *
 * Base Dependencies / Imports
 *
 ****************************/

// prevent module aliases from breaking once transpiled
import 'module-alias/register';

/* Base Dependencies */
import express from 'express';
import 'express-async-errors'; // catch thrown errors in async handlers
import { json } from 'body-parser';

/* Transitive Dependencies */
import { NormalizeError } from '@vue-forum/common/middlewares';
import { NotFound } from '@vue-forum/common/models';

/* Routers and Local Middlewares */
import {
  loginRouter,
  registerRouter,
  renewRouter
} from '@/routes';

import initMongoConn from '@/database';

/****************************
 *
 * Server Configurations
 *
 ****************************/

const PORT = process.env.PORT || 5000;

const app = express();

/*  Middlewares */
app.use(json());

/* Router Associations */
app.use(loginRouter);
app.use(registerRouter);
app.use(renewRouter);

/* Fallback */
app.all('*', () => {
  throw new NotFound();
});

/* Error-handling */

// will catch all thrown errors, even those in async fns
app.use(NormalizeError);

/****************************
 *
 * Server Runtime Conf
 *
 ****************************/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
}); // TODO replace w/PM2

// initialize db conn
initMongoConn();
