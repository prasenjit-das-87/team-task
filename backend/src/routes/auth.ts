import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import { register, login, listAuthUsers } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authorize';

const router = Router();

//Register a auth user
router.post('/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  body('role').optional().isIn(['admin','member']).withMessage('Invalid role'),
  body('name').optional().isString()
], validate, register);

//Login a auth user
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], validate, login);

// admin only: list auth users
router.get('/users', authMiddleware, requireRole('admin'), listAuthUsers);

export default router;
