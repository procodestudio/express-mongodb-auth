import app from './src/app';
import logger from './logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`App is running on port ${PORT}`);
});

process.on('uncaughtException', (error) => {
  if (error.errno === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is busy. Fix it or try again with another port.`);
  }

  process.exit(1);
});


export default app;
