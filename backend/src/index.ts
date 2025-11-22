import mongoose from 'mongoose';
import config from './config';
import app from './app';
import logger from './utils/logger';

const start = async () => {
  await mongoose.connect(config.mongoURI);
  logger.info('Connected to MongoDB');
  app.listen(config.port, () => logger.info(`Server listening on ${config.port}`));
};

start().catch(err => {
  logger.error('Failed to start server: ' + (err?.message || err));
  process.exit(1);
});
