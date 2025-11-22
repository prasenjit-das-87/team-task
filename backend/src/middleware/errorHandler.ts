import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

//Error handle
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}\n${err.stack || ''}`);
  return res.status(statusCode).json({ success: false, message: err.message || 'Internal Server Error' });
};
