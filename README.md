# PostImage-API

A RESTful API for an image post-sharing platform, built with Node.js, TypeScript, Express, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js 24
- **Language:** TypeScript
- **Framework:** Express
- **ORM:** Sequelize + sequelize-typescript
- **Database:** PostgreSQL 16
- **Validation:** Zod
- **Authentication:** JWT (Access Token + Refresh Token)
- **Security:** Helmet, CORS, express-rate-limit
- **Containerization:** Docker + Docker Compose

## Project Structure
```
src/
├── config/
├── controllers/
├── enums/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── seeders/
├── services/
├── types/
└── utils/
```

## Requirements

- Node.js 24+
- Docker

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/PostImage-API.git
cd PostImage-API
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Fill in the `.env` file with your values. Generate secure JWT secrets with at least 32 characters.

### 4. Start the database
```bash
docker run --name postimage-db \
  -e POSTGRES_USER=your_db_user \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_DB=your_db_name \
  -p 5432:5432 -d postgres:16
```

On subsequent runs, just start the existing container:
```bash
docker start postimage-db
```

### 5. Run the API
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`.  
Tables are created automatically on startup if they don't exist.  
The admin user is seeded automatically on every startup. Credentials are defined in your `.env` file.

## Running with Docker Compose

If you want to run both the API and the database together in Docker:

### 1. Configure environment variables
```bash
cp .env.example .env
cp .env.docker.example .env.docker
```

Fill in the `.env` file. The `.env.docker` file only needs `DB_HOST=postimage-db`.

### 2. Start everything
```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000/api`.

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive tokens |
| POST | `/api/auth/refresh` | No | Refresh access token |
| POST | `/api/auth/logout` | Yes | Logout and invalidate refresh token |

### Posts

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/posts` | No | List all posts (paginated) |
| GET | `/api/posts/:id` | No | Get a post by ID |
| POST | `/api/posts` | Yes | Create a post |
| DELETE | `/api/posts/:id` | Yes | Delete a post |

### Comments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/posts/:postId/comments` | No | List comments of a post |
| POST | `/api/posts/:postId/comments` | Yes | Add a comment to a post |
| PUT | `/api/comments/:id` | Yes | Update a comment |
| DELETE | `/api/comments/:id` | Yes | Delete a comment |

### Likes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/posts/:postId/likes` | Yes | Toggle like on a post |
| GET | `/api/posts/:postId/likes` | No | Get like count of a post |

## Authentication

This API uses JWT Bearer token authentication. Include the access token in the `Authorization` header:
```
Authorization: Bearer your_access_token
```

Access tokens expire based on `JWT_EXPIRES_IN` (default: `8h`).  
Use the `/api/auth/refresh` endpoint with your refresh token to obtain a new access token.

## Pagination

The `/api/posts` endpoint supports pagination via query parameters:
```
GET /api/posts?page=1&limit=10
```

Response includes a `meta` object:
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Rate Limiting

- **Global:** 100 requests per 15 minutes
- **Auth routes:** 10 requests per 15 minutes