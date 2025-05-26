
// server/routes/taskRoutes.js
import express from 'express';
import {
  createTask,
  deleteTask,
  completeTask,
  getTasks,
  editTask, // Import the editTask controller
} from '../controllers/taskController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get tasks (admin gets tasks they created, employee gets tasks assigned to them)
router.get('/', protect, getTasks);

// Admin creates a task
router.post('/', protect, adminOnly, createTask);

// Admin edits a task
router.put('/:id', protect, adminOnly, editTask); // Add the editTask route

// Admin deletes a task
router.delete('/:id', protect, adminOnly, deleteTask);

// Employee marks a task as complete
router.put('/:id/complete', protect, completeTask); // Correct: Using completeTask

export default router;

