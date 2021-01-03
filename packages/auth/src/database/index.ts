import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@vue-forum/common';

export const init = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  catch (err) {
     throw new DatabaseConnectionError();
  }
};