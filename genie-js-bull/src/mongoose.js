import mongoose from 'mongoose';
import CallApi from './models/callApi.model';

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (process.env.ENV === 'development') {
  mongoose.set('debug', true);
}

export const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    auth: { authSource: 'admin' },
  });
  return mongoose.connection;
};

export const getMongoConnection = () => mongoose.connection;

const models = { CallApi };
export default models;