# Job Application Tracker

A web application built with a React/TypeScript frontend and Node.js/Express/MongoDB backend to help you manage your job applications.

## Project Overview

This application helps users track their job applications with features including:

- Dashboard with status visualization
- Adding and managing job applications 
- Tracking application status (Need to apply, Pending, Interview, Technical Test, etc.)
- Managing professional contacts
- Viewing statistics about your job search

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tool
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form for form management
- Recharts for data visualization
- ShadCN UI components

### Backend
- Node.js with Express
- MongoDB database
- JWT for authentication
- Winston for logging

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Setting up the Backend

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=3000
   HOST=localhost
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/job-applications
   JWT_SECRET=your_jwt_secret_here
   SESSION_SECRET=your_session_secret_here
   LOG_LEVEL=info
   LOG_FILE=application.log
   ```
   
   If you're using MongoDB Atlas, replace the MONGODB_URI with your connection string.

4. Create a logs directory:
   ```bash
   mkdir logs
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Setting up the Frontend

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Modify the API base URL in the `src/config/config.ts` file if needed:
   ```typescript
   const config = {
     api: {
       baseUrl: "http://localhost:3000/api/v1",
       timeout: 5000,
     },
     frontend: {
       MODE: import.meta.env.MODE || "development",
     },
   };
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Usage

1. Register a new account using the registration page
2. Log in with your credentials
3. Use the dashboard to view and manage your job applications
4. Add new job applications using the "Add Job" button
5. Track the status of each application and update details as needed

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Make sure MongoDB is running locally or your Atlas connection string is correct
   - Check network connection and firewall settings

2. **Frontend not connecting to Backend**:
   - Verify API base URL in the frontend configuration
   - Ensure the backend server is running on the expected port

3. **Authentication Issues**:
   - Clear browser cookies and local storage
   - Verify JWT secret in the .env file

## Project Structure

### Backend
- `/config`: Configuration settings
- `/controllers`: API endpoint handlers
- `/middleware`: Express middleware
- `/models`: Mongoose data models
- `/routes`: API routes
- `/utils`: Utility functions

### Frontend
- `/src/components`: Reusable UI components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions
- `/src/pages`: Page components
- `/src/services`: API service functions
- `/src/types`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.