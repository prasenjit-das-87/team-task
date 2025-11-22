import { Schema, model, Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'todo'|'in-progress'|'done';
  assignee?: Types.ObjectId | null;
  dueDate?: Date | null;
}

//Mongoose schema for task
const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
  assignee: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null }
}, { timestamps: true });

export default model<ITask>('Task', taskSchema);
