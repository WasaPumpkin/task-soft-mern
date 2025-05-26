
// server/routes/userRoutes.js
// server/routes/userRoutes.js

import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getEmployees,
  getUserById, // Add this import
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/', registerUser);

// User login
router.post('/login', loginUser);

// Get current user info
router.get('/current', protect, getCurrentUser);

// Get all employees (admin only)
router.get('/employees', protect, adminOnly, getEmployees);

// Get a single user by ID (add this route)
router.get('/:userId', protect, getUserById);

export default router;