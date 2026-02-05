import mongoose from 'mongoose';
import { dbUri } from '@/lib/env';
import { logger } from '@/lib/winston';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUri, {
      autoIndex: true,
      connectTimeoutMS: 10000,
    });

    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) =>
  logger.error(`Mongoose error: ${err}`),
);
mongoose.connection.on('disconnected', () =>
  logger.warn('Mongoose disconnected'),
);
