import http from 'http';
import path from 'path';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import campaignRoutes from '@/routes/campaign.route';

import { connectDB } from '@/config/db';
import { logger } from '@/utils/winston';
import { frontendUri, backendPort } from '@/utils/env';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [frontendUri],
    credentials: true,
    preflightContinue: false,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.set('trust proxy', 1);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req: Request, res: Response) => {
  res.send('Backend running successfully!');
});

app.use(
  '/api/',
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Max requests authorized',
  }),
);

const server = http.createServer(app);

app.use('/api/campaign', campaignRoutes);

const start = async () => {
  await connectDB();

  server.listen(backendPort, () =>
    logger.info(`App runing at: ${backendPort}`),
  );
};

start();

const gracefulShutdown = () => {
  server.close(async () => {
    logger.info('HTTP server closed');
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
