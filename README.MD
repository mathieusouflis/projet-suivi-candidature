# Job Application Tracker

## Overview

Job Application Tracker is a full-stack web application designed to help users organize and manage their job applications. It provides a comprehensive dashboard to track application statuses, manage interview dates, and store contact information related to job opportunities.

## Features

- **User Authentication**: Secure login and registration system
- **Interactive Dashboard**: Visual representation of application statuses and statistics
- **Application Management**: Track job applications with details such as:
  - Job title
  - Company
  - Status (Need to apply, Pending, Interview, Technical Test, Accepted, Rejected)
  - Type (Internship, Apprenticeship, Full-time, Contract, Freelance)
  - Application dates
  - Location and salary information
- **Contact Management**: Store and organize professional contacts
- **Reminder System**: Get alerts for applications that need follow-up

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- React Hook Form with Zod for form validation
- Tailwind CSS for styling
- Recharts for data visualization
- ShadCN UI components

### Backend
- Node.js with Express
- MongoDB for database storage
- JWT for authentication
- Winston for logging

## Installation

### Prerequisites
- Node.js (v18 or later)
- MongoDB (installed locally or accessible remotely)

### Backend Setup
1. Navigate to the Backend directory
```bash
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
# Server configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/job-tracker

# Security
JWT_SECRET=your_secure_jwt_secret
SESSION_SECRET=your_secure_session_secret

# Logging
LOG_LEVEL=info
LOG_FILE=application.log
```

4. Start the backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the Frontend directory
```bash
cd Frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a configuration file or modify the existing one to point to your backend
```bash
# src/config/config.ts
const config = {
    api: {
        baseUrl: "http://localhost:3000/api/v1",
        timeout: 5000,
    },
    frontend: {
        MODE: "development",
    }
}

export default config;
```

4. Start the frontend development server
```bash
npm run dev
```

5. Access the application at http://localhost:5173

## Usage

1. Register a new account or login with existing credentials
2. Navigate to the dashboard to view your job application statistics
3. Add new job applications using the "Add Job" button
4. Click on any job in the table to view and edit its details
5. Use the filters to sort applications by status

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login an existing user

### Applications
- `GET /api/v1/applications` - Get all applications
- `GET /api/v1/applications/:id` - Get application by ID
- `POST /api/v1/applications` - Create a new application
- `PUT /api/v1/applications/:id` - Update an application
- `DELETE /api/v1/applications/:id` - Delete an application

### Contacts
- `GET /api/v1/contacts` - Get all contacts
- `GET /api/v1/contacts/:id` - Get contact by ID
- `POST /api/v1/contacts` - Add a new contact
- `PUT /api/v1/contacts/:id` - Update a contact
- `DELETE /api/v1/contacts/:id` - Delete a contact

### Statistics
- `GET /api/v1/stats` - Get application statistics

## Project Structure

```
.
├── Backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── server.js         # Main server file
│
└── Frontend/
    ├── public/           # Static files
    ├── src/
    │   ├── components/   # React components
    │   ├── config/       # Configuration
    │   ├── hooks/        # Custom React hooks
    │   ├── layouts/      # Page layouts
    │   ├── lib/          # Utility functions
    │   ├── middleware/   # Client-side middleware
    │   ├── pages/        # Page components
    │   ├── services/     # API service calls
    │   ├── styles/       # CSS and Tailwind styles
    │   └── types/        # TypeScript type definitions
    └── main.tsx          # Entry point
```