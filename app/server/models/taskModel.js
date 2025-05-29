
// server/models/taskModel.js

import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add task text'],
    },
    // The admin who created (assigned) the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The employee to whom the task is assigned
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    completedAt: {
      type: Date,
    },
    completionMessage: {
      type: String, // New field to store the user's message
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);



// import mongoose from 'mongoose';

// const taskSchema = mongoose.Schema(
//   {
//     text: {
//       type: String,
//       required: [true, 'Please add task text'],
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//       index: true,
//     },
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//       index: true,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'in-progress', 'completed', 'cancelled'],
//       default: 'pending',
//       index: true,
//     },
//     completedAt: {
//       type: Date,
//     },
//     completionMessage: {
//       type: String,
//       minlength: [10, 'Completion message must be at least 10 characters long'],
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // Virtual for derived field
// taskSchema.virtual('isCompleted').get(function () {
//   return this.status === 'completed';
// });

// // Pre-save hook for completedAt
// taskSchema.pre('save', function (next) {
//   if (this.isModified('status') && this.status === 'completed') {
//     this.completedAt = new Date();
//   }
//   next();
// });

// export default mongoose.model('Task', taskSchema);