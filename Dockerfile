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

# Copy the build output from the builder stage to /app/dist
COPY --from=builder /app/dist ./dist

# Set working directory to /app/server to match local structure
WORKDIR /app/server

# Copy server dependency definitions
COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy server source code
COPY server/ .

# Generate Prisma Client
RUN npx prisma generate

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
