# BlogSpace - Blog Frontend Application

A responsive Blog Frontend Application built using React, TypeScript, Vite, Tailwind CSS, and React Router.

The application consumes the custom Blog REST API created in the previous backend assignment. It displays real blog posts, authors, and comments from the backend API.

---

## Features

- Blog Home Page
- Blog Detail Page
- Blog Search
- Search posts by title
- Search posts by content
- Author information
- Comments
- Loading states
- API error handling
- Empty post handling
- No search result handling
- Invalid blog/post ID handling
- Responsive design for desktop and mobile
- Reusable React components
- API service layer
- Environment variable for API base URL

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Fetch API

### Backend

The frontend communicates with the custom Blog REST API developed in Assignment 3.

- Node.js
- Express
- TypeScript
- Supabase PostgreSQL

---

## Application Flow

```text
React Frontend
      |
      v
API Service Layer
      |
      v
Express REST API
      |
      v
Supabase PostgreSQL

The frontend does not directly communicate with Supabase. All data is retrieved through the backend APIs.

API Endpoints Used

The frontend uses the following backend APIs:

Method	Endpoint	Purpose
GET	/posts	Get all blog posts
GET	/posts/:id	Get a single blog post
GET	/users	Get all users/authors
GET	/users/:id	Get a single author
GET	/posts/:id/comments	Get comments for a post
Blog Home Page

The Home Page:

Fetches posts using GET /posts
Fetches authors using GET /users
Displays blog post titles and content
Displays the author associated with each post
Provides a responsive card-based layout
Provides search functionality
Handles loading, error, and empty states

Post and author information are connected using the userId from each post.

Example:

Post.userId
     |
     v
User.id
     |
     v
Author Name
Blog Search

The Home Page provides search functionality.

Users can search blog posts using keywords from:

Post title
Post content

Example:

Search: API

Matching posts are displayed on the Home Page.

When no post matches the search term, the application displays:

No posts found

Search is case-insensitive.

Blog Detail Page

When a user clicks a blog post, the application navigates to:

/posts/:id

The Blog Detail Page fetches:

GET /posts/:id
GET /users/:id
GET /posts/:id/comments

The page displays:

Blog title
Blog content
Author information
Comment count
Comments
Invalid post handling
Loading state
Error state
Project Structure
src/
├── components/
│   └── layout/
│       ├── Header/
│       │   └── Header.tsx
│       └── Footer.tsx
│
├── pages/
│   ├── Home.tsx
│   └── PostDetail.tsx
│
├── services/
│   ├── api.ts
│   ├── post.service.ts
│   └── user.service.ts
│
├── types/
│   ├── post.ts
│   ├── user.ts
│   └── comment.ts
│
├── utils/
│
├── styles/
│
├── App.tsx
└── main.tsx
API Service Layer

API calls are kept inside the services folder instead of being written directly inside UI components.

Example:

getPosts();
getPostById(id);
getUsers();
getUserById(id);
getPostComments(id);

This keeps API communication separate from UI logic and makes the application easier to maintain.

Environment Variables

The API base URL is stored in an environment variable.

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:3000

A .env.example file is also included:

VITE_API_BASE_URL=http://localhost:3000

The real .env file should not be committed to GitHub.

Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project directory:

cd react-typescript-task-main

Install dependencies:

npm install
Environment Setup

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:3000
Running the Backend

Make sure the Assignment 3 backend is running.

Open the backend project and run:

npm install
npm run dev

The backend runs on:

http://localhost:3000
Running the Frontend

Open the frontend project and run:

npm run dev

Vite will provide the local development URL, for example:

http://localhost:5173

or another available port such as:

http://localhost:5174
Build for Production

To create a production build:

npm run build
API Testing

API testing is performed using Postman.

Example requests:

GET http://localhost:3000/posts
GET http://localhost:3000/users
GET http://localhost:3000/posts/1
GET http://localhost:3000/users/1
GET http://localhost:3000/posts/1/comments

Recommended Postman environment variable:

baseUrl = http://localhost:3000

Then requests can be written as:

GET {{baseUrl}}/posts
GET {{baseUrl}}/users
GET {{baseUrl}}/posts/1
GET {{baseUrl}}/users/1
GET {{baseUrl}}/posts/1/comments
Error Handling

The frontend handles common API and application states:

Loading
Loading posts...
API Error
Failed to load blog posts.
Empty Posts
No posts are available right now.
No Search Results
No posts found.
Invalid Post
Post not found
Routing

The application uses React Router.

Main routes:

/                  → Blog Home Page
/posts/:id         → Blog Detail Page

Clicking a post card navigates to the corresponding Blog Detail Page.

Responsive Design

The application is designed to work across:

Desktop screens
Tablets
Mobile devices

The navigation changes to a mobile menu on smaller screens.

The blog cards and content sections also adjust based on screen size.
