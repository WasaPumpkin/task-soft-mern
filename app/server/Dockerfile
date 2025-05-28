# Stage 1: Build dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy ONLY package files first (better caching)
COPY package*.json ./
COPY yarn.lock ./

# Install production-only deps
RUN npm ci --only=production

# Copy server source code
COPY . .

# Stage 2: Runtime image
FROM node:20-alpine

WORKDIR /app

# Copy production node_modules
COPY --from=builder /app/node_modules ./node_modules

# Copy only essential files (adjust these paths to match your server structure)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes

# Security: Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app
USER appuser

# Runtime config
ENV NODE_ENV=production
EXPOSE 7000

CMD ["node", "server.js"]