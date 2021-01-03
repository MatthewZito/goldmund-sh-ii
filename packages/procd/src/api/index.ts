/* Base Dependencies */
import express from 'express';
import { json } from 'body-parser';

/* Transitive Dependencies */
import { errorNormalizer } from '@lan-monitor/common';

/* Router Configurations */

/****************************
 * 
 * Server Configurations
 * 
 ****************************/

const PORT = process.env.PORT || 5001;

const app = express();
app.use(json());

/* Router Associations */

/* Middlewares */
app.use(errorNormalizer);

/****************************
 * 
 * Server Runtime Conf
 * 
 ****************************/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});
