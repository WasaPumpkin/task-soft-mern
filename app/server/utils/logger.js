// utils/logger.js
import winston from 'winston';

// Create a custom log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance with different transports (console and file)
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    // Log to console for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Log to a file for production (can also be rotated with additional config)
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

// Export the logger
export default logger;
