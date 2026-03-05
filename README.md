# Project Odin Book

A social media REST API built with Express.js, Prisma, PostgreSQL, and JWT auth. Supports local auth, GitHub OAuth2, and guest access.

**Live demo:** [odinbookxd.netlify.app](https://odinbookxd.netlify.app) · **Frontend repo:** [github.com/frrst-ian/Odin-Book](https://github.com/frrst-ian/Odin-Book)

---

## Setup

```bash
git clone https://github.com/frrst-ian/Project-Odin-Book.git
cd Project-Odin-Book
npm install
npx prisma generate
npx prisma migrate deploy
node app.js
```

---

## Environment Variables

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/odinbook
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## Stack
Node.js, Express, PostgreSQL, Prisma, JWT, Cloudinary, Passport.js

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login with email and password |
| GET | `/api/auth/github` | GitHub OAuth login |
| POST | `/api/auth/guest` | Login as guest |
| GET | `/api/u` | Search users |
| GET | `/api/u/profile` | Get current user profile |
| GET | `/api/u/:id` | Get user by ID |
| GET | `/api/p` | Get all posts |
| POST | `/api/p` | Create a post |
| GET | `/api/p/:id` | Get a post |
| POST | `/api/p/:id/c` | Comment on a post |
| POST | `/api/p/l` | Like a post |
| DELETE | `/api/p/ul` | Unlike a post |
| GET | `/api/f` | Get following list |
| POST | `/api/f` | Follow a user |
| DELETE | `/api/f` | Unfollow a user |

Protected routes require `Authorization: Bearer <token>`. Guests have read-only access.