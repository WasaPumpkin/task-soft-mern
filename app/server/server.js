// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import  logger from './utils/logger.js';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet'; // Added for security
import morgan from 'morgan'; // Added for logging
import { fileURLToPath } from 'url';


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Connect to MongoDB
connectDB();

const app = express();

// Security headers
app.use(helmet());

// HTTP request logging
app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// Enable CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://task-mngmt-infoempleados.onrender.com',
    ],
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Serve static frontend files
const staticDir = path.join(__dirname, '../client/dist');
app.use(express.static(staticDir));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Serve frontend app for all other GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// 404 handler for unmatched routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Central error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () =>
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.warn('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});