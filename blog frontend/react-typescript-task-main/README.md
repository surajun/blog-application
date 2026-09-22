# React + TypeScript + Tailwind CSS Project

A frontend project built using **React, TypeScript, Vite, React Router, and Tailwind CSS**.

This repository contains the work completed for **Assignment 1** and **Assignment 2**, focusing on reusable React components, TypeScript type safety, responsive UI design, routing, and Tailwind CSS.

## GitHub Repository

https://github.com/surajun/react-typescript-task

---

# Technologies Used

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- CSS
- Git
- GitHub

---

# Assignment 1 - React + TypeScript Setup

## Objective

The first assignment focused on setting up a React project with TypeScript, creating a clean folder structure, building reusable typed components, implementing routing, and applying basic CSS styling.

## Features Implemented

- Vite React project with TypeScript
- Clean and organized folder structure
- Reusable Header component
- Reusable Footer component
- Reusable Button component
- Reusable Card component
- TypeScript interfaces for component props
- Home Page
- About Page
- React Router navigation
- Navbar with Home and About links
- Global TypeScript types
- Basic CSS styling
- Type-safe React components

## Assignment 1 Folder Structure

```text
src/
├── assets/
│
├── components/
│   ├── cards/
│   │   └── Card.tsx
│   │
│   ├── elements/
│   │   └── Button.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── pages/
│   ├── Home.tsx
│   └── About.tsx
│
├── styles/
│   └── global.css
│
├── types/
│   └── global.ts
│
├── utils/
│
├── App.tsx
└── main.tsx
```

## Assignment 1 Component Details

### Header

The Header component contains the application title and navigation.

### Footer

The Footer component provides common footer content across the application.

### Button

The Button component is reusable and uses typed props such as:

- `text`
- `onClick`
- `type`

### Card

The Card component displays:

- Title
- Description
- Button

The component uses TypeScript interfaces to ensure that the correct props are provided.

## Routing

React Router is used for page navigation.

```text
/        -> Home Page
/about   -> About Page
```

---

# Assignment 2 - Header & Hero Section Using Tailwind CSS

## Objective

The second assignment focused on learning Tailwind CSS, creating reusable UI components, building a modern SaaS-style landing page, and implementing responsive design for mobile, tablet, and desktop screens.

## Features Implemented

- Tailwind CSS configured with Vite
- Responsive SaaS-style Header
- Company Logo
- Navigation menu
- Home
- Features
- Pricing
- About
- Contact
- Login button
- Get Started button
- Responsive mobile menu
- Sticky Header
- Hero Badge
- Hero Heading
- Hero Description
- Primary CTA
- Secondary CTA
- Dashboard Preview
- Hero Statistics section
- Responsive layout
- Reusable TypeScript components
- Shared TypeScript interfaces
- Lucide icons

## Assignment 2 Folder Structure

```text
src/
├── assets/
│   └── hero-dashboard.png
│
├── components/
│   │
│   ├── cards/
│   │   └── Card.tsx
│   │
│   ├── elements/
│   │   └── Button.tsx
│   │
│   ├── layout/
│   │   ├── Footer.tsx
│   │   │
│   │   └── Header/
│   │       ├── Header.tsx
│   │       ├── Logo.tsx
│   │       ├── Navigation.tsx
│   │       ├── NavItem.tsx
│   │       ├── HeaderButtons.tsx
│   │       └── MobileMenu.tsx
│   │
│   └── hero/
│       ├── Hero.tsx
│       ├── HeroBadge.tsx
│       ├── HeroTitle.tsx
│       ├── HeroDescription.tsx
│       ├── HeroButtons.tsx
│       ├── HeroImage.tsx
│       └── HeroStats.tsx
│
├── pages/
│   ├── Home.tsx
│   └── About.tsx
│
├── styles/
│   └── global.css
│
├── types/
│   └── global.ts
│
├── utils/
│
├── App.tsx
└── main.tsx
```

---

# Header Component Structure

The Header is divided into smaller reusable components:

```text
Header
├── Logo
├── Navigation
│   └── NavItem
├── HeaderButtons
└── MobileMenu
```

This keeps the Header modular and easier to maintain.

---

# Hero Component Structure

The Hero section is divided into reusable components:

```text
Hero
├── HeroBadge
├── HeroTitle
├── HeroDescription
├── HeroButtons
├── HeroImage
└── HeroStats
```

---

# Hero Statistics

The Hero section contains four statistics:

| Statistic | Value |
|---|---:|
| Customers | 10K+ |
| Messages | 2.4M+ |
| Automation | 32K+ |
| Uptime | 99.9% |

The statistics are stored as typed data and rendered dynamically using React.

---

# TypeScript Types

Shared types are stored in:

```text
src/types/global.ts
```

The project uses interfaces such as:

```text
NavItemData
CardData
HeroStat
```

These help maintain type safety and prevent incorrect props or data from being passed to components.

---

# Responsive Design

The application is designed to work across:

- Mobile
- Tablet
- Desktop

Tailwind responsive utilities are used to change layouts, spacing, typography, and navigation depending on the screen size.

The desktop navigation is replaced with a mobile menu on smaller screens.

---

# Tailwind CSS Setup

Tailwind CSS is integrated with Vite.

The project uses:

```text
tailwindcss
@tailwindcss/vite
```

Tailwind CSS is imported through:

```text
src/styles/global.css
```

The Vite configuration includes the Tailwind Vite plugin.

---

# Project Structure Overview

The overall project is organized as follows:

```text
react-typescript-task/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cards/
│   │   ├── elements/
│   │   ├── hero/
│   │   └── layout/
│   │
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/surajun/react-typescript-task.git
```

Navigate into the project:

```bash
cd react-typescript-task
```

Install dependencies:

```bash
npm install
```

---

# Run the Development Server

Start the project using:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173/
```

Open the URL in your browser.

---

# TypeScript Check

To check the project for TypeScript errors:

```bash
npx tsc --noEmit
```

The project should complete the check without TypeScript errors.

---

# ESLint Check

Run:

```bash
npm run lint
```

The project should complete without ESLint errors.

---

# Production Build

To create a production build:

```bash
npm run build
```

---

# Git Workflow

The project is maintained using Git and GitHub.

Common commands used:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "Describe your changes"
```

```bash
git push
```

---

# Learning Objectives

Through these assignments, the project demonstrates understanding of:

- React component architecture
- TypeScript with React
- TypeScript interfaces and props
- Reusable components
- React Router
- Tailwind CSS
- Responsive web design
- Mobile navigation
- Component composition
- Dynamic rendering using arrays and `.map()`
- Clean folder organization
- Basic Git workflow
- GitHub repository management

---

# Assignment Status

## Assignment 1

Completed:

- Vite + React + TypeScript setup
- Folder structure
- Reusable components
- Typed props
- Home and About pages
- React Router
- Navbar
- Common layout
- CSS styling
- Global TypeScript types

## Assignment 2

Completed:

- Tailwind CSS configuration
- Reusable Header components
- Responsive navigation
- Mobile menu
- Hero section
- Hero CTA buttons
- Dashboard preview
- Statistics cards
- Responsive design
- TypeScript interfaces
- Tailwind-based styling

---

# Author

Suraj Kumar
