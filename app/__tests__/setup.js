import mongoose from '../src/database';

afterAll(async () => {
  await mongoose.disconnect();
});
