FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Set environment variables (these will be overridden by docker-compose)
ENV PORT=3000
ENV NODE_ENV=development
ENV MONGODB_URI=mongodb://mongodb:27017/job-applications
ENV JWT_SECRET=your_secure_jwt_secret_for_development
ENV SESSION_SECRET=your_secure_session_secret_for_development

# Expose default port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
