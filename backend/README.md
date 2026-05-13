# WebMakers Backend

Node/Express API for the WebMakers admin dashboard, backed by PostgreSQL.

## Environment

Create `backend/.env` from `backend/.env.example` and set real production values:

```env
NODE_ENV=development
PORT=4000
FRONTEND_ORIGIN=http://localhost:8080,http://localhost:8081,http://localhost:8082
DATABASE_URL=postgres://postgres:postgres@localhost:5433/webmakers
JWT_SECRET=use-a-long-random-secret
ADMIN_EMAIL=eliudkirwa451@gmail.com
ADMIN_PASSWORD=your-admin-password
```

Do not commit the real password or JWT secret.

## Setup

```bash
npm run dev
```

The root dev command starts PostgreSQL with Docker if needed, runs migrations, seeds the admin data, starts the backend API, and starts the main website together.

The frontend reads `VITE_API_URL`; if omitted it uses `http://localhost:4000`.

Useful targeted commands:

```bash
npm run frontend:dev
npm run backend:dev
npm run db:up
npm run db:down
npm run db:setup
npm run dev:no-db
```

## Production Notes

- Run migrations before deployment.
- Use HTTPS so the production admin cookie can be `secure`.
- Keep `FRONTEND_ORIGIN` restricted to the deployed website/admin origins.
- Rotate `JWT_SECRET` and the seeded admin password when handing over production access.
