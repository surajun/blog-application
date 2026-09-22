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
- Use the application on desktop and mobile screens

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

```text
Search: API

Results:
- How to Build a REST API
- Understanding API Authentication
- REST API Best Practices
