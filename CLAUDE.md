# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Door Codes API — a RESTful backend for managing door codes (name, address, code) with user authentication. Built with Express.js 5, MongoDB/Mongoose, and JWT auth. Uses ES6 modules throughout.

## Commands

```bash
npm run dev    # Start dev server with nodemon (watches api.js, database.js)
npm start      # Start production server
```

No test framework or linter is configured.

The server runs on port 3000 by default. Requires a running MongoDB instance (connection string in `.env` as `MONGO_URI`).

## Architecture

**Entry point:** `api.js` — Express app setup, global DB connection middleware, route mounting, error handler.

**Request flow:** All requests pass through a DB connection check middleware, then route to `/api/auth`, `/api/items`, or `/api/user`. Protected routes use JWT auth middleware (`middleware/auth.js`) that verifies Bearer tokens and attaches `req.user`.

**Layer structure:**
- `routes/` — Route definitions, mount auth middleware on protected endpoints
- `controllers/` — Business logic, direct Mongoose model operations (no service layer)
- `models/` — Mongoose schemas (User, Item)
- `middleware/` — JWT authentication

**Key patterns:**
- Items are scoped to users via `createdBy.userId`. Every item operation verifies the requesting user owns the item using `compareUserId()` in `controllers/items.js`.
- Passwords are bcrypt-hashed via a Mongoose pre-save hook in the User model.
- JWT tokens expire after 1 hour. The secret is in `SECRET_KEY` env var.
- Error handling uses custom error objects with status codes, caught by a global error handler middleware.
- `database.js` caches the Mongoose connection (checks `readyState` to avoid reconnecting).

**API routes:**
- `POST /api/auth/register`, `POST /api/auth/login` — public
- `GET /api/user/profile` — protected
- `POST /api/items/add`, `GET /api/items`, `GET /api/items/:id`, `PATCH /api/items/update/:id`, `DELETE /api/items/delete/:id` — all protected

## Deployment

Configured for Vercel serverless deployment (`vercel.json`). `api.js` conditionally calls `app.listen()` only when the `VERCEL` env var is not set.
