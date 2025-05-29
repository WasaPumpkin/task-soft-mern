
// server/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};











// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import logger from '../utils/logger.js';

// export const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer')) {
//     token = authHeader.split(' ')[1];
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       logger.warn(
//         `Token expired for user: ${req.user ? req.user.id : 'unknown'}`
//       );
//       res.status(401);
//       throw new Error('Not authorized, token expired');
//     } else {
//       logger.error(`Token verification failed: ${error.message}`);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   }
// });

// export const roleBasedAccess = (roles) => (req, res, next) => {
//   if (req.user && roles.includes(req.user.role)) {
//     next();
//   } else {
//     res.status(403);
//     throw new Error(`Not authorized, requires role: ${roles.join(', ')}`);
//   }
// };

// // Example usage for admin-only routes
// export const adminOnly = roleBasedAccess(['admin']);