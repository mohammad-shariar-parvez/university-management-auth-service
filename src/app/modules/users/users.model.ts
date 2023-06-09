import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

// Create a new Model type that knows about upcimming any methods...
type UserModel = Model<IUser, object>

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<IUser>(
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
  },
  {
    timestamps: true,
  }
)

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema)
