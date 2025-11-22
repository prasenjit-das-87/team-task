import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import { createUser, listUsers, deleteUser } from '../controllers/usersController';
import authMiddleware from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authorize';

const router = Router();

//All user routes
router.post('/', authMiddleware, requireRole('admin'), [ body('name').notEmpty().withMessage('Name required') ], validate, createUser);
router.get('/', authMiddleware, listUsers);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteUser);

export default router;
