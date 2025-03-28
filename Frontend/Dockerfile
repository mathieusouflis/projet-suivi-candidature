FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set up environment variables
ENV API_BASE_URL=http://localhost:3000/api/v1
ENV MODE=development

# Expose port 5173 (default Vite dev server port)
EXPOSE 5173

# Start development server with host flag to make it accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]