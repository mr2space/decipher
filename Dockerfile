FROM node:23-alpine

# Create and set up the application user
RUN addgroup -S backend && adduser -S -G backend -h /home/backend backend


# Copy and install backend dependencies
WORKDIR /home/backend
COPY ./backend/package*.json .
RUN npm install

# Copy the backend code
COPY ./backend .

# Set up the frontend
WORKDIR /home/frontend
COPY ./frontend/package*.json .
RUN npm install

# Copy the frontend code
COPY ./frontend .

# Expose required ports
EXPOSE 3000 5173

# Start both backend and frontend processes
WORKDIR /home
CMD ["sh", "-c", "node /home/backend/server.js & cd /home/frontend && npm run dev -- --host 0.0.0.0"]
