
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import appRoutes from './routes';

dotenvExpand(dotenv.config({ path: path.resolve('envs', '.env') }));

const app = express();

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ health: 'ok' });
});

app.use(appRoutes);

export default app;
