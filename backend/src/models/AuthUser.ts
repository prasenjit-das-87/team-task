import { Schema, model, Document } from 'mongoose';

export interface IAuthUser extends Document {
  email: string;
  password: string;
  role: 'admin'|'member';
}

//Mongoose schema for Auth user
const authUserSchema = new Schema<IAuthUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','member'], default: 'member' }
}, { timestamps: true });

export default model<IAuthUser>('AuthUser', authUserSchema);
