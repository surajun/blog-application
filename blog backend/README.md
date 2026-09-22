Blog REST API

A TypeScript REST API for a Blog application built with Express.js and Supabase PostgreSQL.

Tech Stack

Node.js

Express.js

TypeScript

Supabase PostgreSQL

@supabase/supabase-js

Zod

dotenv

tsx

Features

CRUD APIs for Users, Posts, and Comments

Supabase PostgreSQL persistence

Foreign-key relationships

Request body, route parameter, and query validation

Consistent JSON error responses

Relationship validation for userId and postId

Environment-based configuration

Postman collection included

Database Relationship

User
 └── Posts
      └── Comments

users.id
   ↑
posts.user_id

posts.id
   ↑
comments.post_id

Project Structure

blog-rest-api/
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── supabase.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   ├── post.controller.ts
│   │   └── comment.controller.ts
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   └── validate.middleware.ts
│   ├── routes/
│   │   ├── user.routes.ts
│   │   ├── post.routes.ts
│   │   └── comment.routes.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── post.service.ts
│   │   └── comment.service.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── post.types.ts
│   │   └── comment.types.ts
│   ├── validations/
│   │   ├── user.validation.ts
│   │   ├── post.validation.ts
│   │   └── comment.validation.ts
│   ├── utils/
│   │   ├── async-handler.ts
│   │   └── app-error.ts
│   └── server.ts
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── postman/
│   └── Blog REST API.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

Setup

1. Install dependencies

npm install

2. Create .env

Create .env in the project root:

SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=3000

Do not commit .env.

3. Set up the database

Run supabase/migrations/001_initial_schema.sql in the Supabase SQL Editor.

4. Start the API

npm run dev

The server runs at:

http://localhost:3000

5. Verify the database connection

GET http://localhost:3000/health/db

Expected:

{
  "message": "Database connection successful"
}

Scripts

npm run dev
npm run build
npm start
npx tsc --noEmit

API Documentation

Base URL:

http://localhost:3000

Users

Method

Endpoint

Description

GET

/users

Get all users

GET

/users/:id

Get a single user

POST

/users

Create a user

PUT

/users/:id

Replace a user

PATCH

/users/:id

Partially update a user

DELETE

/users/:id

Delete a user

GET

/users/:id/posts

Get posts created by a user

Create user:

{
  "name": "John Doe",
  "username": "john",
  "email": "john@example.com",
  "phone": "9876543210",
  "website": "example.com"
}

Posts

Method

Endpoint

Description

GET

/posts

Get all posts

GET

/posts/:id

Get a single post

POST

/posts

Create a post

PUT

/posts/:id

Replace a post

PATCH

/posts/:id

Partially update a post

DELETE

/posts/:id

Delete a post

GET

/posts/:id/comments

Get comments for a post

Create post:

{
  "userId": 1,
  "title": "My Post",
  "body": "Post content."
}

Comments

Method

Endpoint

Description

GET

/comments

Get all comments

GET

/comments/:id

Get a single comment

POST

/comments

Create a comment

PUT

/comments/:id

Replace a comment

PATCH

/comments/:id

Partially update a comment

DELETE

/comments/:id

Delete a comment

GET

/comments?postId=:postId

Filter comments by post

Create comment:

{
  "postId": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "body": "Great post!"
}

Error Responses

400 Validation error

{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}

404 Not found

{
  "message": "Post not found"
}

409 Conflict

{
  "message": "Username or email already exists"
}

500 Server error

{
  "message": "Internal server error"
}

Postman

Import:

postman/Blog REST API.postman_collection.json

The collection contains Users, Posts, and Comments requests and uses the collection variable:

baseUrl = http://localhost:3000

Requests use:

{{baseUrl}}/users
{{baseUrl}}/posts
{{baseUrl}}/comments

Security

Supabase credentials are stored in environment variables.

.env is ignored by Git.

.env.example contains placeholders only.

Never commit the Supabase secret key.