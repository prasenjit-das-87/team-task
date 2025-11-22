import { Request, Response } from 'express';
import AuthUser from '../models/AuthUser';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import logger from '../utils/logger';
import User from "../models/User";


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const exists = await AuthUser.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await AuthUser.create({
      email,
      password: hashed,
      role: role || "member"
    });

    // Auto create team user entry
    await User.create({
      name: req.body.name || email.split("@")[0],
      email
    });


    logger.info(`User registered: ${email}`);

    const userSafe = {
      _id: user._id,
      email: user.email,
      role: user.role
    };

    return res.status(201).json(userSafe);
  } catch (err: any) {
    logger.error("Register error: " + (err?.message || err));
    return res.status(500).json({ error: err?.message || "Server error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await AuthUser.findOne({ email });
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`Login failed - invalid password: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { userId: user._id.toString(), role: user.role, email: user.email };
    const signOptions: SignOptions = { expiresIn: config.jwtExpiresIn as any };
    const secret = config.jwtSecret as jwt.Secret;
    const token = jwt.sign(payload, secret, signOptions);

    logger.info(`User logged in: ${email}`);
    return res.json({ token, user: { _id: user._id, email: user.email, role: user.role } });
  } catch (err: any) {
    logger.error('Login error: ' + (err?.message || err));
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
};

// Admin: list auth users
export const listAuthUsers = async (_req: Request, res: Response) => {
  const users = await AuthUser.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};
