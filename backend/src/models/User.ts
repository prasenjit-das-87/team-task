import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
}

//Mongoose schema for user

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String }
}, { timestamps: true });

export default model<IUser>('User', userSchema);
