# Stage 1: Build the React application
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Setup Backend Server
FROM node:20-slim
WORKDIR /app

# Copy the build output from the builder stage to /app/dist
COPY --from=builder /app/dist ./dist

# Install system dependencies (Required for Prisma on Debian)
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Set working directory to /app/server
WORKDIR /app/server

# Copy server dependency definitions
COPY server/package*.json ./

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy server source code
COPY server/ .

# Generate Prisma Client
RUN npx prisma generate

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
