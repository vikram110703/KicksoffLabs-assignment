
# KicksoffLabs Assignment

This repository contains a full-stack application split into two parts:
1. **Backend**: A Node.js/Express server handling API routes and database operations.
2. **Frontend**: A React application styled with Tailwind CSS.

## Prerequisites

Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (if applicable for the backend)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/vikram110703/KicksoffLabs-assignment.git
cd KicksoffLabs-assignment
```

### 2. Backend Setup

Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file for environment variables in the `Backend` directory (e.g., database URI, port):
```
DB_NAME=calendar_app
DB_HOST=host url of your db(postgresql)
DB_USER=postgresql user name
DB_PASSWORD=postfreSql user password
JWT_SECRET=abcd!2#@#ajdj
PORT=db port ||5432

```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies:
```bash
cd ../frontend
npm install
```

Start the React development server:
```bash
npm start
```

### 4. Access the Application

- **Backend** runs on: `http://localhost:5000` (or the port specified in `.env`).
- **Frontend** runs on: `http://localhost:3000` by default.

---

## Project Structure

### Backend
```
Backend/
├── config/         # Configuration files (e.g., database connection)
├── controllers/    # API controllers
├── middleware/     # Middleware functions
├── models/         # Database models
├── routes/         # API routes
├── server.js       # Entry point for the backend server
└── package.json    # Backend dependencies
```

### Frontend
```
frontend/
├── public/         # Static assets
├── src/            # React components and application logic
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json    # Frontend dependencies
```

---

## Dependencies

### Backend
- Express
- Mongoose (for MongoDB)
- Other dependencies listed in `Backend/package.json`

### Frontend
- React
- Tailwind CSS
- Other dependencies listed in `frontend/package.json`

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Copy this content into a `README.md` file in your project's root directory. Let me know if you need further adjustments!
