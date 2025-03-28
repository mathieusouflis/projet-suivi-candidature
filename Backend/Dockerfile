FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies including development dependencies
COPY package*.json ./
RUN npm install

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development

# Run the app in development mode with hot-reloading
CMD ["npm", "run", "dev"]