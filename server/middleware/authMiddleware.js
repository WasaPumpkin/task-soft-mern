
// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
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






// // server/middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import { checkSession } from './sessionTimer.js';

// // Unified error handling
// const handleAuthError = (error, res) => {
//   if (error.name === 'TokenExpiredError') {
//     return res.status(401).json({ 
//       code: 'TOKEN_EXPIRED', 
//       message: 'Your session has expired. Please log in again.' 
//     });
//   }
//   if (error.name === 'JsonWebTokenError') {
//     return res.status(401).json({ 
//       code: 'INVALID_TOKEN', 
//       message: 'Invalid authentication token' 
//     });
//   }
//   return res.status(401).json({ 
//     message: error.message || 'Not authorized' 
//   });
// };

// // Main authentication with session control
// export const protectWithSession = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No authentication token provided' });
//   }

//   try {
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'User account not found' });
//     }

//     req.user = user;
//     await checkSession(req, res, next);
//   } catch (error) {
//     handleAuthError(error, res);
//   }
// });

// // Basic authentication (without session timeout)
// export const protect = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader?.startsWith('Bearer ')) {
//     res.status(401);
//     throw new Error('No authentication token provided');
//   }

//   try {
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       res.status(401);
//       throw new Error('User account not found');
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     handleAuthError(error, res);
//   }
// });

// // Admin middleware
// export const adminOnly = (req, res, next) => {
//   if (req.user?.role === 'admin') return next();
//   res.status(403).json({ 
//     code: 'ADMIN_REQUIRED',
//     message: 'Administrator privileges required' 
//   });
// };























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