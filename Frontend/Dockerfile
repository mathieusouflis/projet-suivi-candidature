# Use Node.js as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 5173 (default Vite dev server port)
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
