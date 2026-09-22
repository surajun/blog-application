# BlogSpace - Blog Frontend Application

A responsive Blog Frontend Application built using **React, TypeScript, Vite, Tailwind CSS, and React Router**.

This project was developed as **Assignment 4 - Blog Frontend Application** and consumes the custom REST APIs created in the previous backend assignment.

---

## 📌 Project Overview

BlogSpace is a simple blog platform where users can:

- View blog posts
- View post authors
- Search blog posts
- Open a blog post and view its details
- Read comments for a blog post
- Navigate between the Home Page and Blog Detail Page
- Use the application on desktop, tablet, and mobile screens

All blog data is fetched from the custom backend API.

The frontend does **not** use JSONPlaceholder or hard-coded blog data.

---

## ✨ Features

### 🏠 Blog Home Page

- Fetches blog posts from the backend API
- Fetches users from the backend API
- Displays post title and content
- Displays the author of each post
- Responsive blog card layout
- Search functionality
- Loading state
- API error state
- Empty post state
- No-search-results state
- Responsive navigation header
- Footer section

### 🔎 Blog Search

Users can search blog posts using keywords.

Search is performed against:

- Post Title
- Post Content

Example:

    Search: API

    Results:
    - How to Build a REST API
    - Understanding API Authentication
    - REST API Best Practices

The search is:

- Case-insensitive
- Performed using the posts fetched from the backend
- Updated dynamically as the user types
- Able to handle no-result cases

Example:

    No posts found for "React".

### 📖 Blog Detail Page

When a user clicks a blog post, the application navigates to:

    /posts/:id

The detail page displays:

- Blog title
- Blog content
- Author information
- Author username
- Author email
- Comments
- Comment count
- Post ID
- Loading state
- Error state
- Invalid post handling
- Back to Home navigation

### 💬 Comments

Comments are fetched from the backend using:

    GET /posts/:id/comments

The detail page displays:

- Comment author name
- Comment email
- Comment body
- Number of comments

The application also handles posts that have no comments.

### 📱 Responsive Design

The application supports:

- Desktop screens
- Tablet screens
- Mobile screens

The header includes a mobile navigation menu for smaller screens.

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Fetch API

### Backend

The frontend consumes the custom backend created in Assignment 3.

- Node.js
- Express
- TypeScript
- Supabase PostgreSQL
- Zod

---

## 🔗 Backend Integration

The frontend communicates with the custom Blog REST API.

Backend URL:

    http://localhost:3000

The frontend does not communicate directly with Supabase.

### Architecture

    React Frontend
           |
           | HTTP Requests
           v
    Express Backend
           |
           v
      Controllers
           |
           v
        Services
           |
           v
    Supabase PostgreSQL

---

## 🌐 API Endpoints Used

The frontend uses the following backend APIs.

### Posts

#### Get all posts

    GET /posts

Used on the Home Page to fetch all blog posts.

#### Get a single post

    GET /posts/:id

Used on the Blog Detail Page.

Example:

    GET /posts/1

#### Get comments for a post

    GET /posts/:id/comments

Used on the Blog Detail Page.

Example:

    GET /posts/1/comments

### Users

#### Get all users

    GET /users

Used on the Home Page to match posts with their authors.

#### Get a single user

    GET /users/:id

Used on the Blog Detail Page to display author information.

Example:

    GET /users/1

---

## 🔄 API Data Flow

### Home Page

    Home Page
        |
        | GET /posts
        | GET /users
        v
    Backend API
        |
        v
    Posts + Users
        |
        v
    Match post.userId with user.id
        |
        v
    Display post + author

### Blog Detail Page

    Post Card
        |
        | Click
        v
    /posts/:id
        |
        | GET /posts/:id
        | GET /users/:id
        | GET /posts/:id/comments
        v
    Backend API
        |
        v
    Post + Author + Comments
        |
        v
    Blog Detail Page

---

## 🧩 Project Structure

    react-typescript-task-main/
    │
    ├── public/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   └── layout/
    │   │       ├── Header/
    │   │       │   └── Header.tsx
    │   │       │
    │   │       └── Footer.tsx
    │   │
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   └── PostDetail.tsx
    │   │
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── post.service.ts
    │   │   └── user.service.ts
    │   │
    │   ├── types/
    │   │   ├── post.ts
    │   │   ├── user.ts
    │   │   └── comment.ts
    │   │
    │   ├── utils/
    │   │   ├── formatDate.ts
    │   │   └── validation.ts
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── README.md

---

## 📂 Folder Responsibilities

### `components/`

Contains reusable React UI components.

Examples:

    Header
    Footer

These components can be reused across multiple pages.

### `pages/`

Contains application pages.

    Home.tsx
    PostDetail.tsx

`Home.tsx` is the Blog Home Page.

`PostDetail.tsx` is the Blog Detail Page.

### `services/`

Contains API-related logic.

    api.ts
    post.service.ts
    user.service.ts

This keeps API calls separate from UI components.

Examples:

    getPosts()
    getPostById()
    getPostComments()
    getUsers()
    getUserById()

### `types/`

Contains TypeScript interfaces for API data.

Examples:

    Post
    User
    Comment

This provides type safety when working with backend responses.

### `utils/`

Contains reusable helper functions.

---

## 🔐 Environment Variables

The frontend uses an environment variable for the backend API URL.

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The frontend accesses it using:

```ts
import.meta.env.VITE_API_BASE_URL
```

### `.env.example`

The project also contains:

```text
.env.example
```

with:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Important

The real `.env` file should **not** be committed to GitHub.

The `.gitignore` file contains:

```text
.env
```

Only `.env.example` should be committed.

---

## 🚀 Getting Started

Follow the steps below to run the application locally.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd react-typescript-task-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Start the backend

Make sure the Assignment 3 backend is running.

Open the backend project and run:

```bash
npm install
npm run dev
```

The backend should run on:

    http://localhost:3000

### 5. Start the frontend

Open the frontend project and run:

```bash
npm install
npm run dev
```

Vite will display the local development URL in the terminal.

Example:

    http://localhost:5173

If port `5173` is already in use, Vite may automatically use another port such as:

    http://localhost:5174

Use the URL shown in the terminal.

---

## ▶️ Available Scripts

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 🧪 API Testing with Postman

The APIs are tested using **Postman**.

Set the Postman collection variable:

    baseUrl = http://localhost:3000

### Posts

```http
GET {{baseUrl}}/posts
GET {{baseUrl}}/posts/1
GET {{baseUrl}}/posts/1/comments
```

### Users

```http
GET {{baseUrl}}/users
GET {{baseUrl}}/users/1
```

### Invalid Post

```http
GET {{baseUrl}}/posts/999999
```

Expected response:

```json
{
  "message": "Post not found"
}
```

Expected status:

    404 Not Found

---

## 🧪 Frontend Testing

The application should be tested through the frontend browser.

### Home Page

Verify that:

- Posts are displayed
- Author names are displayed
- Loading state appears while data is being fetched
- API errors are handled
- Empty post lists are handled

### Search

Verify:

- Searching by title
- Searching by post content
- Case-insensitive searching
- No-result handling

Example:

    Search: API

### Blog Detail

Verify:

- Clicking a post opens the detail page
- Correct post is displayed
- Correct author is displayed
- Comments are displayed
- Invalid post IDs are handled
- Back navigation works

### Responsive Design

Verify the UI on:

- Desktop
- Tablet
- Mobile

---

## 🔎 Search Implementation

Search is handled on the frontend using the posts fetched from:

    GET /posts

The search checks:

    post.title
    post.body

The comparison is case-insensitive.

Example:

    User enters:
    api

The application can match posts such as:

    API Design
    Building a REST API
    Understanding API Authentication

---

## 🧭 Routing

React Router is used for page navigation.

### Home Page

    /

### Blog Detail Page

    /posts/:id

Example:

    /posts/1

The post ID is read from the URL using React Router.

---

## 🏗️ Component-Based Architecture

The application follows a component-based architecture.

    App
     |
     +── Home
     |    |
     |    +── Header
     |    +── Search
     |    +── Post Cards
     |    +── Footer
     |
     +── PostDetail
          |
          +── Header
          +── Article
          +── Author Information
          +── Comments
          +── Footer

Reusable components are separated from page-level components to keep the code organized and maintainable.

---

## 🎨 UI Design

The Home Page and Blog Detail Page were developed based on the provided Figma/reference designs.

The implementation focuses on:

- Typography
- Spacing
- Responsive layout
- Blog cards
- Search UI
- Navigation
- Author information
- Comments
- Mobile navigation
- Consistent visual styling

The Search Result UI was designed independently because a specific Figma design for search results was not provided.

---

## 📱 Responsive Support

The frontend uses responsive Tailwind CSS classes to support different screen sizes.

The application adapts to:

    Desktop
    Tablet
    Mobile

The navigation menu changes to a mobile menu on smaller screens.

---

## 🔒 Security and Configuration

- API base URL is stored in an environment variable
- `.env` is excluded from Git
- Backend validation remains handled by the backend API
- API communication is centralized through the service layer
- Frontend does not contain database credentials
- Supabase credentials are never used directly in the frontend

---

## 🚫 JSONPlaceholder

This project does **not** directly use:

    https://jsonplaceholder.typicode.com

All blog data comes from the custom backend API developed in the previous assignment.

---

## 📋 Assignment Requirements Checklist

### Home Page

- [x] Blog Home Page
- [x] Fetch posts using `GET /posts`
- [x] Fetch users using `GET /users`
- [x] Display post information
- [x] Display author information
- [x] No hard-coded blog data
- [x] Responsive UI

### Blog Search

- [x] Search functionality
- [x] Search by post title
- [x] Search by post content
- [x] Clean search result UI
- [x] No-result handling

### Blog Detail Page

- [x] Blog Detail Page
- [x] Fetch post using `GET /posts/:id`
- [x] Fetch author using `GET /users/:id`
- [x] Fetch comments using `GET /posts/:id/comments`
- [x] Display blog title
- [x] Display blog content
- [x] Display author information
- [x] Display comments
- [x] Invalid post handling

### Technical Requirements

- [x] React
- [x] TypeScript
- [x] Component-based architecture
- [x] React Router
- [x] Reusable components
- [x] API service layer
- [x] Environment variable for API Base URL
- [x] Loading states
- [x] Error handling
- [x] Empty states
- [x] Responsive design
- [x] `.env.example`
- [x] README

---

## 🔗 Related Backend Project

The frontend depends on the custom Blog REST API created in Assignment 3.

The backend provides:

    Users
    Posts
    Comments

The backend includes:

- CRUD APIs
- Input validation
- Error handling
- Resource relationships
- Supabase PostgreSQL persistence

---

## 📌 Important Notes

1. Start the backend before using the frontend.
2. Make sure the backend is running on the URL configured in `.env`.
3. Do not commit `.env`.
4. Use `.env.example` when setting up the project on another machine.
5. The frontend uses only the custom backend APIs.
6. API requests can be tested using Postman.
7. Supabase is accessed through the backend, not directly from the frontend.

---

## 👨‍💻 Author

Developed as part of the Blog Application assignment.

---

## 📄 Assignment

**Assignment 4 - Blog Frontend Application**

### Technologies Used

    React
    TypeScript
    Vite
    Tailwind CSS
    React Router
    Lucide React
    Node.js
    Express
    Supabase PostgreSQL
    Zod
