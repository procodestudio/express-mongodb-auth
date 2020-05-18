
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve('envs', '.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ health: 'ok' });
});

export default app;
