import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/team-task-db',
  jwtSecret: process.env.JWT_SECRET || 'secret123',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d'
};
