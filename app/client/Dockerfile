# TASK-SOFT-MERN/client/Dockerfile

# C:\Users\Andrey Desktop\Task-Soft-Mern\client\Dockerfile

# Stage 1: Build the React/Vite application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one)
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of your client-side application code
COPY . .

# Build your React/Vite application for production
RUN npm run build

# --- Stage 2: Serve the application with Nginx ---
FROM nginx:alpine

# --- REMOVED OR COMMENTED OUT THIS LINE ---
# RUN rm /etc/nginx/html/index.html

# Copy your custom Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application (static files) from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80, as Nginx serves HTTP traffic on port 80 by default
EXPOSE 80

# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]