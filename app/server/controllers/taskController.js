// server/controllers/taskController.js

import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    Admin creates a task and assigns it to an employee
// @route   POST /api/tasks
// @access  Private/Admin
export const createTask = asyncHandler(async (req, res) => {
  const { text, assignedTo } = req.body;
  if (!text || !assignedTo) {
    res.status(400);
    throw new Error(
      'Please provide a valid task text and an employee to assign it to.'
    );
  }
  const task = await Task.create({
    text: text.trim(),
    createdBy: req.user.id, // Admin's ID
    assignedTo, // Employee's ID
  });
  res.status(201).json(task);
});

// @desc    Admin deletes a task (only tasks created by admin)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  if (task.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }
  await task.deleteOne();

  res.json({ message: 'Task removed' });
});

// @desc    Employee marks a task as complete and adds a completion message
// @route   PUT /api/tasks/:id/complete
// @access  Private
// @route   PUT /api/tasks/:id/complete
// @access  Private
export const completeTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Allow the assigned employee OR an admin to mark the task as complete
  if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to complete this task');
  }

  task.status = 'completed';
  task.completedAt = Date.now();
  task.completionMessage = req.body.completionMessage; // Save the message from the request

  const updatedTask = await task.save();
  res.json(updatedTask);
});


// @desc    Get tasks for the logged in user
//          For admin: tasks they created
//          For employee: tasks assigned to them
export const getTasks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 tasks per page if not provided
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  let query;
  if (req.user.role === 'admin') {
    query = { createdBy: req.user.id }; // Admin sees tasks they created
  } else {
    query = { assignedTo: req.user.id }; // Employee sees tasks assigned to them
  }

  // Fetch paginated tasks
  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit)
    .exec(); // Use .exec() to return a proper Promise

  // Get the total count of tasks for pagination metadata
  const totalTasks = await Task.countDocuments(query);

  // Calculate total pages
  const totalPages = Math.ceil(totalTasks / limit);

  // Send response with tasks and pagination metadata
  res.json({
    success: true,
    tasks,
    page,
    limit,
    totalPages,
    totalTasks,
  });
});



// @desc    Admin edits a task (only tasks created by admin)
// @route   PUT /api/tasks/:id
// @access  Private/Admin
export const editTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Only allow the admin who created the task to edit it
  if (task.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to edit this task');
  }

  const { text, assignedTo } = req.body;

  if (text) {
    task.text = text.trim();
  }
  if (assignedTo) {
    task.assignedTo = assignedTo;
  }

  const updatedTask = await task.save();
  res.json(updatedTask);
});



