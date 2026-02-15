# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Setup Backend Server
FROM node:20-alpine
WORKDIR /app

# Copy the build output from the builder stage to /app/dist
COPY --from=builder /app/dist ./dist

# Install system dependencies (Required for Prisma on Alpine)
RUN apk add --no-cache openssl libc6-compat

# Set working directory to /app/server
WORKDIR /app/server

# Copy server dependency definitions
COPY server/package*.json ./

# Install dependencies (Skip scripts to avoid failure while schema is missing)
RUN npm ci --omit=dev --ignore-scripts

# Copy server source code (including prisma/schema.prisma)
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
