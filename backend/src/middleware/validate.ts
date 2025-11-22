import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

//Form body validation
export default function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(e => `${e.param}: ${e.msg}`).join(', ');
    logger.warn(`Validation failed: ${formatted}`);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
