# ======= STAGE 1: Build React App =======
FROM node:16-alpine AS builder

WORKDIR /app

COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm install

COPY client ./client
RUN cd client && npm run build


# ======= STAGE 2: Setup Server =======
FROM node:16-alpine

WORKDIR /app

# Install dependencies for Express server
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm install

# Copy Express source code
COPY server ./server

# Copy built frontend into server/public (or your static folder)
COPY --from=builder /app/client/build ./server/public

# Expose backend port
EXPOSE 3001

# Start server (which also serves React build from ./public)
CMD ["node", "server/index.js"]
