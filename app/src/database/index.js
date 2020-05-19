import dotenv from 'dotenv';
import path from 'path';
import dotenvExpand from 'dotenv-expand';
import mongoose from 'mongoose';

dotenvExpand(dotenv.config({ path: path.resolve('envs', '.env') }));

const dbUrl = process.env.DB_URL;
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, dbOptions);

mongoose.Promise = global.Promise;

export default mongoose;
