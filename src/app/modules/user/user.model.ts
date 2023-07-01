import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

// Create a new Model type that knows about upcimming any methods...
// type UserModel = Model<IUser, object>

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
