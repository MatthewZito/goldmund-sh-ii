import mongoose from 'mongoose';
import { DatabaseConnError } from '@vue-forum/common';

/**
 * @summary Initializes a connection to the auth / user database
 */
export const init = async () => {
  try {
    await mongoose.connect(`${process.env.AUTH_MONGO_CONN_STR}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  catch (err) {
    throw new DatabaseConnError();
  }
};
