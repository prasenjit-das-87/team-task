import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import tasksRoutes from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

// request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/', (_req, res) => res.send('Team Task Dashboard API'));

// global error handler (last)
app.use(errorHandler);

export default app;
