# TASK-SOFT-MERN/server/Dockerfile

# C:\Users\Andrey Desktop\Task-Soft-Mern\server\Dockerfile

# Stage 1: Build/Install Dependencies
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) first
# This allows Docker to cache this layer, speeding up subsequent builds
# if dependencies haven't changed.
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application source code
# This copies all files from your server directory into the build stage.
# The .dockerignore file will prevent unwanted files (like node_modules, .env) from being copied.
COPY . .

# --- Stage 2: Create a lighter production-ready image ---
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the installed node_modules from the build stage
COPY --from=build /app/node_modules ./node_modules

# COPY ONLY THE NECESSARY APPLICATION FILES from the build stage
# This is the crucial change: instead of 'COPY . .', we specify what to copy.
# This prevents copying development files like .env or test files into the final image.
COPY --from=build /app/app.js ./app.js
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/controllers ./controllers
COPY --from=build /app/middleware ./middleware
COPY --from=build /app/models ./models
COPY --from=build /app/routes ./routes
COPY --from=build /app/utils ./utils
# Add any other top-level files or directories your server explicitly needs (e.g., config files, public assets)

# Expose the port your Node.js app listens on (which is 7000 from your .env)
EXPOSE 7000

# Command to run your application
# This is fine if you have a 'server' script in package.json like "server": "node server.js"
CMD ["npm", "start"]