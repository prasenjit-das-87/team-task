import { Request, Response } from 'express';
import Task from '../models/Task';
import logger from '../utils/logger';
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    logger.info(`Task created: ${task._id}`);
    res.status(201).json(task);
  } catch (err: any) {
    logger.error('Create task error: ' + err.message);
    res.status(400).json({ error: err.message });
  }
};

export const listTasks = async (req: AuthRequest, res: Response) => {
  let query: any = {};

  // Member should only see their own tasks
  if (req.user?.role === "member") {
    // find corresponding team user by email
    const teamUser = await User.findOne({ email: req.user.email });

    if (teamUser) {
      query.assignee = teamUser._id;
    } else {
      // No linked team-user found → return empty
      return res.json([]);
    }
  }

  const tasks = await Task.find(query)
    .populate("assignee")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { assigneeId } = req.body;
    const updated = await Task.findByIdAndUpdate(id, { assignee: assigneeId || null }, { new: true }).populate('assignee');
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    logger.info(`Task assigned: ${id} -> ${assigneeId}`);
    res.json(updated);
  } catch (err: any) {
    logger.error('Assign task error: ' + err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await Task.findById(id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  // Member cannot update someone else's task
  if (req.user?.role === "member" && task.assignee?.toString() !== req.user?.userId) {
    return res.status(403).json({ error: "Not allowed to update this task" });
  }

  task.status = status;
  await task.save();

  const populated = await task.populate("assignee");

  res.json(populated);
};


// Update full task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await Task.findByIdAndUpdate(id, payload, { new: true }).populate('assignee');
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    logger.info(`Task updated: ${id}`);
    res.json(updated);
  } catch (err: any) {
    logger.error('Update task error: ' + err.message);
    res.status(400).json({ error: err.message });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removed = await Task.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: 'Task not found' });
    logger.info(`Task deleted: ${id}`);
    res.json({ success: true });
  } catch (err: any) {
    logger.error('Delete task error: ' + err.message);
    res.status(500).json({ error: err.message });
  }
};
