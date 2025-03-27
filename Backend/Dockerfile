# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variable for MongoDB
ENV MONGODB_URI=your_mongodb_connection_string

# Expose default port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
