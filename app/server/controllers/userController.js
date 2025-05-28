// controllers/userController.js
// controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Get a single user by ID
// @route   GET /api/users/:userId
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password'); // Exclude password
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Allow access if the requesting user is an Admin or is accessing their own data
  if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
    res.status(403);
    throw new Error('Forbidden: Insufficient permissions');
  }

  res.json(user);
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role, // Optional; defaults to 'employee' in the model if not provided
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get current user
// @route   GET /api/users/current
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all employees (for admin)
// @route   GET /api/users/employees
// @access  Private/Admin
export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: 'employee' }).select('_id name email');
  res.json(employees);
});





// import asyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import validator from 'validator';
// import User from '../models/userModel.js';
// import logger from '../utils/logger.js';

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '30d',
//   });
// };

// // @desc    Register new user
// // @route   POST /api/users
// // @access  Public
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error('Please add all fields');
//   }

//   if (!validator.isEmail(email)) {
//     res.status(400);
//     throw new Error('Invalid email address');
//   }

//   if (password.length < 8) {
//     res.status(400);
//     throw new Error('Password must be at least 8 characters long');
//   }

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role: role || 'employee',
//   });

//   if (user) {
//     logger.info(`User ${user._id} registered with email ${user.email}`);
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Authenticate a user
// // @route   POST /api/users/login
// // @access  Public
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     logger.info(`User ${user._id} logged in`);
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid credentials');
//   }
// });

// // @desc    Get current user
// // @route   GET /api/users/current
// // @access  Private
// export const getCurrentUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);
//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Get all employees (for admin)
// // @route   GET /api/users/employees
// // @access  Private/Admin
// export const getEmployees = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const employees = await User.find({ role: 'employee' })
//     .select('_id name email')
//     .skip(skip)
//     .limit(limit);

//   res.json({
//     page,
//     limit,
//     total: employees.length,
//     employees,
//   });
// });