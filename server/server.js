//server/server.js
// import dotenv from 'dotenv';
// import express from 'express';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';
// import { errorHandler } from './middleware/errorMiddleware.js';
// import cors from 'cors';
// import path from 'path';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import { fileURLToPath } from 'url';
// import mongoSanitize from 'express-mongo-sanitize';
// import rateLimit from 'express-rate-limit';
// import winston from 'winston'; // For structured logging

// // --- Environment Variables Setup and Validation ---
// dotenv.config();

// const requiredEnvVars = [
//   'PORT',
//   'MONGO_URI',
//   'JWT_SECRET',
//   'CLIENT_URL',
//   'API_BASE_URL',
// ];
// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     console.error(
//       `Missing required environment variable: ${envVar}. Please check your .env file or environment configuration.`
//     );
//     process.exit(1); // Exit process if critical env vars are missing
//   }
// }

// const PORT = process.env.PORT || 7000;
// const CLIENT_URL = process.env.CLIENT_URL;
// const API_BASE_URL = process.env.API_BASE_URL;

// // --- Logger Setup ---
// const logger = winston.createLogger({
//   level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json() // Use JSON format for structured logging in production
//   ),
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple() // Simpler format for console output
//       ),
//     }),
//     // In a real production scenario, you might add file transports or transports to a log management service
//   ],
// });

// // --- DB Connection ---
// // connectDB function should handle its own errors and process exit
// connectDB();

// const app = express();

// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); // This will be the '/server' directory

// // --- Global App Settings ---
// app.disable('x-powered-by'); // Hide X-Powered-By header for security

// // --- Enhanced Security Middleware ---
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         // 'unsafe-inline' should be avoided if possible. Consider nonces/hashes for inline scripts/styles.
//         scriptSrc: ["'self'", "'unsafe-inline'"],
//         styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
//         imgSrc: ["'self'", 'data:', 'blob:'],
//         // Dynamically set connect-src based on environment variables
//         connectSrc: [
//           "'self'",
//           API_BASE_URL,
//           CLIENT_URL,
//           `ws://${new URL(API_BASE_URL).hostname}:${PORT}`,
//         ], // Adjust WebSocket URL as needed
//         fontSrc: ["'self'", 'fonts.gstatic.com'],
//         // Consider adding frameAncestors: ["'self'"] to prevent clickjacking
//       },
//     },
//     crossOriginEmbedderPolicy: false, // Set to true if you are sure you don't embed cross-origin content without CORP headers
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
//   })
// );

// // Add secure headers
// app.use((req, res, next) => {
//   res.set({
//     'X-XSS-Protection': '1; mode=block',
//     'X-Content-Type-Options': 'nosniff',
//     'Access-Control-Allow-Credentials': 'true',
//   });
//   // Only apply HSTS in production environments
//   if (process.env.NODE_ENV === 'production') {
//     res.setHeader(
//       'Strict-Transport-Security',
//       'max-age=31536000; includeSubDomains; preload'
//     );
//   }
//   next();
// });

// // Data sanitization
// app.use(
//   mongoSanitize({
//     replaceWith: '_',
//     onSanitize: ({ req, key }) => {
//       logger.warn(`Sanitized ${key} in request ${req.method} ${req.path}`);
//     },
//   })
// );

// // Enhanced CORS configuration
// app.use(
//   cors({
//     origin: CLIENT_URL, // Dynamically set allowed origin from environment variable
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// // Handle preflight requests
// app.options('*', cors());

// // Rate limiting with development bypass
// app.use(
//   '/api',
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 500,
//     message: 'Too many requests from this IP',
//     skip: (req) => process.env.NODE_ENV === 'development',
//   })
// );

// // --- Logging ---
// // Use morgan with winston for production logging
// app.use(
//   morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );
// app.use((req, res, next) => {
//   logger.debug(`Incoming ${req.method} request to ${req.originalUrl}`);
//   next();
// });

// // Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // --- Static files with proper headers ---
// // This is the updated path: go up one directory from 'server', then into 'client', then 'dist'
// const staticDir = path.join(__dirname, '..', 'client', 'dist'); // THIS IS THE CHANGE!
// app.use(
//   express.static(staticDir, {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.js')) {
//         res.setHeader('Content-Type', 'application/javascript');
//       }
//       // Consider adding cache-control headers for static assets in production
//       if (process.env.NODE_ENV === 'production') {
//         res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for 1 year
//       }
//     },
//   })
// );

// // --- Health check endpoint ---
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

// // --- API routes ---
// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);

// // --- Serve frontend ---
// // Catch-all to serve index.html for SPA routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(staticDir, 'index.html'));
// });

// // --- Enhanced 404 handler ---
// app.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'Not Found',
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

// // --- Error handling middleware ---
// app.use(errorHandler);

// // --- Start server ---
// const server = app.listen(PORT, () => {
//   logger.info(`
//   Server running in ${process.env.NODE_ENV || 'development'} mode
//   Listening on port ${PORT}
//   API ready at ${API_BASE_URL}/api
//   Client served from ${CLIENT_URL}
//   `);
// });

// // --- Graceful shutdown ---
// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received. Shutting down gracefully...');
//   server.close(() => {
//     logger.info('Server closed.');
//     process.exit(0);
//   });
// });




// server/server.js
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js'; // Import the configured Express app
import logger from './utils/logger.js'; // Import the logger

// --- Environment Variables Setup and Validation ---
dotenv.config();

const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'CLIENT_URL',
  'API_BASE_URL',
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(
      `Missing required environment variable: ${envVar}. Please check your .env file or environment configuration.`
    );
    process.exit(1);
  }
}

const PORT = process.env.PORT || 7000;
const CLIENT_URL = process.env.CLIENT_URL;
const API_BASE_URL = process.env.API_BASE_URL;

// --- DB Connection ---
connectDB(); // This function should handle its own errors and process exit

// --- Start server ---
const server = app.listen(PORT, () => {
  logger.info(`
  Server running in ${process.env.NODE_ENV || 'development'} mode
  Listening on port ${PORT}
  API ready at ${API_BASE_URL}/api
  Client served from ${CLIENT_URL}
  `);
});

// --- Graceful shutdown ---
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

// Handle unhandled promise rejections (e.g., failed DB connection without proper catch)
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Unhandled Rejection: ${err.message}`, err);
  // Close server & exit process
  server.close(() => process.exit(1));
});












//http://localhost:8000/api/tasks



/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////


///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////
///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////
///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////

// POST http://localhost:7000/api/users


// {
//   "name": "Admin User",
//   "email": "admin@example.com",
//   "password": "12345678",
//   "role": "admin"
// }



// POST http://localhost:7000/api/users
// {
//   "name": "WASABITO",
//   "email": "admin@example.com",
//   "password": "Wasabito1223$",
//   "role": "admin"
// }


//POST http://localhost:7000/api/users/login
//output:
// {
//   "_id": "682380d334c23a7151571f6d",
//   "name": "WASABITO",
//   "email": "admin@example.com",
//   "role": "admin",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM4MGQzMzRjMjNhNzE1MTU3MWY2ZCIsImlhdCI6MTc0NzE1NzIwMywiZXhwIjoxNzQ5NzQ5MjAzfQ.zMZirAbNGrxGucGX3UB0_uJA6lot9CJdgEJzLlLk65c"
// }



/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////
// {
//     "_id": "67c77ddb86a02d2a0d559388",
//     "name": "Admin User",
//     "email": "admin@example.com",
//     "role": "admin",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc3ZGRiODZhMDJkMmEwZDU1OTM4OCIsImlhdCI6MTc0MTEyNzEzMSwiZXhwIjoxNzQzNzE5MTMxfQ.-CoedFGY8UeJBIuM5UkRre2kTCC0I6guiDb2eHf_aLk"
// }


///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////


//POST  http://localhost:7000/api/users/login


// {
//   "email": "admin@example.com",
//   "password": "12345678"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// {
//     "_id": "67c77ddb86a02d2a0d559388",
//     "name": "Admin User",
//     "email": "admin@example.com",
//     "role": "admin",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc3ZGRiODZhMDJkMmEwZDU1OTM4OCIsImlhdCI6MTc0MTEyNzMxOCwiZXhwIjoxNzQzNzE5MzE4fQ.qUh4hUyTm4ubJDUMahAlw8g1JmJBsCkQcdY7WPAJP2c"
// }




////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////

// GET http://localhost:7000/api/users/employees




/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// [
//   {
//     _id: '67bf655cf031741509122fb4',
//     name: 'Andy',
//     email: 'carvajalandrey66@gmail.com',
//   },
// ];





/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////


//POST http://localhost:7000/api/tasks

// {
//   "text": "Complete the project report",
//   "assignedTo": "67bf655cf031741509122fb4"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////




// {
//     "text": "Complete the project report",
//     "createdBy": "67c77ddb86a02d2a0d559388",
//     "assignedTo": "67bf655cf031741509122fb4",
//     "status": "pending",
//     "_id": "67c78150cd5b9bd901292721",
//     "createdAt": "2025-03-04T22:40:16.140Z",
//     "updatedAt": "2025-03-04T22:40:16.140Z",
//     "__v": 0
// }




/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////

// PUT http://localhost:7000/api/tasks/67c78150cd5b9bd901292721


// {
//   "text": "XXXXXX UPDATED Complete the project report",
//   "assignedTo": "67bf655cf031741509122fb4"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// {
//     "_id": "67c78150cd5b9bd901292721",
//     "text": "XXXXXX UPDATED Complete the project report",
//     "createdBy": "67c77ddb86a02d2a0d559388",
//     "assignedTo": "67bf655cf031741509122fb4",
//     "status": "pending",
//     "createdAt": "2025-03-04T22:40:16.140Z",
//     "updatedAt": "2025-03-04T22:43:07.967Z",
//     "__v": 0
// }