import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';

// Create team member
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    logger.info(`Member created: ${user._id}`);
    res.status(201).json(user);
  } catch (err: any) {
    logger.error('Create user error: ' + err.message);
    res.status(400).json({ error: err.message });
  }
};

// List team members
export const listUsers = async (_req: Request, res: Response) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
};

// Delete team member
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removed = await User.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: 'User not found' });
    logger.info(`User deleted: ${id}`);
    res.json({ success: true });
  } catch (err: any) {
    logger.error('Delete user error: ' + err.message);
    res.status(500).json({ error: err.message });
  }
};
