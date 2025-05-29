// server/models/userModel.js

import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // Role can be 'admin' or 'employee'. Default is 'employee'.
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
