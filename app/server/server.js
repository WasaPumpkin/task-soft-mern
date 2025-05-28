// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet'; // Added for security
import morgan from 'morgan'; // Added for logging
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('dev'));

// CORS middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Local development
      'https://task-mngmt-infoempleados.onrender.com', // Production frontend
    ],
    credentials: true,
  })
);
// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "client/dist" directory
const staticDir = path.join(__dirname, '../client/dist');
app.use(express.static(staticDir));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Serve the frontend's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// 404 error handler (this will now only handle requests that don't match any route)
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

// Error Handling Middleware
app.use(errorHandler);

// Validate required environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Start the server
const PORT = process.env.PORT || 4000; // Default to 4000
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
