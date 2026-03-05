# Door Codes API

A RESTful API and mongoDB Database for managing door codes with user authentication. Users can register, login, and manage their own or friends door code entries securely. Created as a part of the Backend & API course at Hyper Island.
(This is a work in progress)

## Features

- 🔐 User authentication with JWT tokens
- 👤 User registration and login
- 🚪 Create, read, and delete door code items
- 🔒 Protected routes requiring authentication
- 📝 User-specific item management (users can only access their own items)
- ✅ Input validation and error handling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB with Mongoose 9.1.5
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Password Hashing:** bcrypt 6.0.0
- **Environment Variables:** dotenv 17.2.3

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation) or MongoDB Atlas account
- npm (comes with Node.js)

## Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd door-codes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_PORT=27017
   SECRET_KEY=your_secret_key_here
   ```
   
   **Important:** 
   - Replace `your_secret_key_here` with a strong, random string for JWT token signing
   - For MongoDB Atlas, use: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net`
   - For local MongoDB, use: `MONGO_URI=mongodb://localhost:27017`

4. **Start MongoDB** (if running locally)
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # Or run directly
   mongod
   ```

## Running the Project

### Development Mode (with auto-reload)

```bash
npx nodemon api.js
```

Or add this script to `package.json`:
```json
"scripts": {
  "dev": "nodemon api.js",
  "start": "node api.js"
}
```

Then run:
```bash
npm run dev
```

### Production Mode

```bash
node api.js
```

The server will start on `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:3000/api`

Protected routes need: `Authorization: Bearer <token>`

**Auth**
- `POST /api/auth/register` — Body: `{ username, email, password }`
- `POST /api/auth/login` — Body: `{ username, password }` → returns `{ token }`

**User**
- `GET /api/user/profile` — Protected

**Items** (all protected)
- `POST /api/items/add` — Body: `{ name, address, code }`
- `GET /api/items` — List your items
- `GET /api/items/:id` — Get one item
- `PATCH /api/items/update/:id` — Body: `{ name?, address?, code? }`
- `DELETE /api/items/delete/:id`


