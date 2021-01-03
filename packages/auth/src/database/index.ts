import mongoose from 'mongoose';
import { DatabaseConnError } from '@vue-forum/common';

export const init = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_CONN_STR}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  catch (err) {
     throw new DatabaseConnError();
  }
};