import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import {
  createTask,
  listTasks,
  assignTask,
  updateTaskStatus,
  deleteTask,
  updateTask
} from '../controllers/tasksController';
import authMiddleware from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authorize';

const router = Router();

//All task routes
router.post('/', authMiddleware, requireRole('admin'), [ body('title').notEmpty().withMessage('Task title is required') ], validate, createTask);
router.get('/', authMiddleware, listTasks);
router.patch('/:id/assign', authMiddleware, requireRole('admin'), [ body('assigneeId').optional().isString() ], validate, assignTask);
router.patch('/:id/status', authMiddleware, requireRole(['admin','member']), [ body('status').isIn(['todo','in-progress','done']).withMessage('Invalid status') ], validate, updateTaskStatus);
router.patch('/:id', authMiddleware, requireRole('admin'), [ body('title').optional().isString() ], validate, updateTask);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteTask);

export default router;
