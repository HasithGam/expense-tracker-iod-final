# expense-tracker-iod-final

Welcome to the Expense Tracker application! This project is designed to help users manage their personal finances by tracking income and expenses. The application consists of two main parts: the client-side (frontend) and the server-side (backend).

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Client (Frontend)](#client-frontend)
- [Server (Backend)](#server-backend)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

expense-tracker/
├── client/
│ ├── README.md
│ ├── package.json
│ ├── public/
│ ├── src/
│ ├── .env.local
│ └── ... (other Next.js files and directories)
├── server/
│ ├── README.md
│ ├── package.json
│ ├── server.js
│ ├── .env
│ └── ... (other Node.js files and directories)
└── README.md


## Getting Started

To get started with the Expense Tracker application, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker

Install dependencies for both client and server.

cd client
npm install
cd ../server
npm install

Running the Application

Client (Frontend)

I. Navigate to the client directory:

cd client

II. Create a .env.local file and add the necessary environment variables:

NEXT_PUBLIC_API_URL=http://localhost:5000

III.Start the client application:

npm run dev

The client application will be available at http://localhost:3000.

Server (Backend)

I. Navigate to the server directory:

cd server

II. Create a .env file and add the necessary environment variables:

PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

Start the server application:
npm start

The server application will be available at http://localhost:5000.


