# Footprint Logger

A full-stack carbon tracking dashboard built with React, Express, and MongoDB.  
The project supports secure authentication, protected activity logging, live dashboard analytics, and community comparison metrics.

## Features

- JWT authentication with password hashing (`bcrypt`)
- Protected activity CRUD APIs
- Community weekly CO2 average API
- Modular React UI with reusable dashboard, charts, and form components
- Responsive blue-and-white SaaS design system
- Centralized frontend API service with 401 auto logout
- Consistent backend API response format: `success`, `data`, `message`
- Unit test coverage for CO2 calculation utility

## Tech Stack

- Frontend: React (JSX), Recharts, CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Testing: Jest

## Setup Instructions

### 1) Clone and install backend dependencies

```bash
cd server
npm install
```

### 2) Configure environment

Create `server/.env`:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

### 3) Run backend

```bash
cd server
npm run dev
```

### 4) Run frontend

Use your existing React runtime and point it to the root entry file:

- Entry: `carbon-footprint-logger.jsx`
- Modular source: `client/src/App.jsx`

If you scaffold a separate client app (Vite/CRA), copy `client/src/*` into that app's `src/` folder and run the standard frontend dev command.

## Folder Structure

```text
footprint-logger/
  client/
    src/
      components/
        charts/
        common/
        dashboard/
        insights/
        layout/
        log/
      constants/
      services/
      utils/
      App.jsx
      styles.css
  server/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
  carbon-footprint-logger.jsx
  README.md
```

## Testing

Run backend tests:

```bash
cd server
npm test
```

Current tests:
- `server/utils/co2.test.js`

## Author

Built by `Fortune` with Cursor-assisted development.
