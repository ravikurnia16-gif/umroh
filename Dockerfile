# Stage 1: Build the React application
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Setup Backend Server
FROM node:20-alpine
WORKDIR /app

# Copy server files
COPY server/package*.json ./

# Install system dependencies for Prisma (OpenSSL)
RUN apk add --no-cache openssl

# Install production dependencies for server
RUN npm ci --omit=dev

# Copy server source code
COPY server/ .
COPY server/prisma ./prisma
# Generate Prisma Client
RUN npx prisma generate

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Expose port (EasyPanel defaults to 80)
EXPOSE 80

# Start server (includes db sync and seed via npm start script)
CMD ["npm", "start"]
