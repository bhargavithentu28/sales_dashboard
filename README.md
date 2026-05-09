# SalesVision Dashboard

A complete modern full-stack Sales Dashboard web application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

## Features
- **Authentication**: JWT-based secure authentication (Login, Register).
- **Dashboard**: Interactive data visualization using Recharts (Revenue Trends, Region Sales, etc.).
- **Admin Panel**: Manage products, users, and orders.
- **Theme**: Dark and Light mode support with a custom Tailwind CSS configuration.
- **Responsive**: Fully responsive and mobile-friendly design.
- **Sample Data Seeder**: Easily populate the database with dummy data for testing.

## Tech Stack
**Frontend**: React, Vite, Tailwind CSS, Recharts, Framer Motion, Axios, React Router v6.
**Backend**: Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), bcrypt.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally OR a MongoDB Atlas cluster URI.

### 1. Clone the repository & Install Dependencies

Open a terminal and navigate to the root directory, then run the following:

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 2. Environment Variables

In the `backend` directory, create or modify the `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/salesvision
JWT_SECRET=super_secret_jwt_key_for_salesvision
```
*(Make sure to change the MONGO_URI if you are using MongoDB Atlas).*

### 3. Seed the Database

To see the dashboard with data, you should seed the database with sample data.
From the `backend` directory, run:
```bash
npm run data:import
```

### 4. Run the Application

You need to start both the backend server and the frontend development server.

**Terminal 1 (Backend)**:
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` (or whatever port Vite assigned).

## Deployment

**Frontend (Vercel)**:
1. Connect your repository to Vercel.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Set the environment variable `VITE_API_URL` if you aren't using a proxy in production.

**Backend (Render/Railway)**:
1. Connect your repository to Render or Railway.
2. Set the start command to `node server.js` or `npm start`.
3. Configure the environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).

---
*Created using Antigravity AI Assistant.*
