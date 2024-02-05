import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  fullname?: string
  email: string
  password: string
  likes: string[]
  searchCount: number
}

const userSchema: Schema = new Schema(
  {
    fullname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    likes: [{ type: String }],
    searchCount: { type: Number, default: 0, required: true },
    searchHistory: [
      {
        keyword: String,
        dateSearched: Date,
      },
    ],
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
