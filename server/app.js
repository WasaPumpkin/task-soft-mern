// server/app.js
// server/app.js
import dotenv from 'dotenv'; // Add this line
dotenv.config(); // Add this line

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import logger from './utils/logger.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Global App Settings ---
app.disable('x-powered-by');

// --- Security Middleware ---
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        connectSrc: [
          "'self'",
          process.env.API_BASE_URL, // This will now be defined
          process.env.CLIENT_URL,   // This will now be defined
          `ws://${new URL(process.env.API_BASE_URL).hostname}:${process.env.PORT}`, // This line caused the error, now fixed
        ],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Add secure headers
app.use((req, res, next) => {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Credentials': 'true',
  });
  if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  next();
});

// Data sanitization
app.use(
  mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      logger.warn(`Sanitized ${key} in request ${req.method} ${req.path}`);
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Dynamically set allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Handle preflight requests for all routes
app.options('*', cors());

// Rate limiting with development bypass
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP',
    skip: (req) => process.env.NODE_ENV === 'development',
  })
);

// --- Logging ---
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use((req, res, next) => {
  logger.debug(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static files with proper headers ---
const staticDir = path.join(__dirname, '..', 'client', 'dist');
app.use(
  express.static(staticDir, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (process.env.NODE_ENV === 'production') {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

// --- Health check endpoint ---
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// --- API routes ---
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// --- Serve frontend (catch-all for SPA routing) ---
// This should come after all API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// --- Enhanced 404 handler (after all defined routes) ---
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
    path: req.originalUrl,
    method: req.method,
  });
});

// --- Error handling middleware (last middleware) ---
app.use(errorHandler);

export default app; // Export the configured Express app
