// middleware/errorMiddleware.js
// middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};










// import logger from '../utils/logger.js';

// export const errorHandler = (err, req, res, next) => {
//   const statusCode =
//     err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

//   // Log the error
//   logger.error({
//     message: err.message,
//     stack: err.stack,
//     statusCode,
//     path: req.path,
//     method: req.method,
//   });

//   res.status(statusCode).json({
//     success: false,
//     error: {
//       code: statusCode,
//       type: err.name || 'InternalServerError',
//       message: err.message,
//       details: process.env.NODE_ENV === 'production' ? null : err.stack,
//     },
//   });
// };

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   logger.error(`Unhandled Rejection: ${err.message}`);
//   throw err;
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   logger.error(`Uncaught Exception: ${err.message}`);
//   process.exit(1);
// });