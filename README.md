# PrepBuddy – Interview Preparation & Job Portal

PrepBuddy is a full-stack platform for interview preparation, experience sharing, coding practice, forums, and graduate job discovery.

---

## Overview

PrepBuddy enables students to:

*   Prepare for interviews through shared real experiences
*   Practice coding problems from top companies
*   Ask and answer questions in a structured forum
*   Track contributions via a leaderboard
*   Discover graduate jobs with filters

---
Live Backend:
https://prep-buddy-tic4.onrender.com/

Live Frontend:
https://prep-buddy-9gc6tfcvt-20040795s-projects.vercel.app/

## Features

### Authentication & Role Management
*   **Secure Auth**: JWT-based authentication with bcrypt password hashing.
*   **Roles**:
    *   `Student`: Access to all learning resources and forum.
    *   `Admin`: Dashboard to manage users, content, and system health.

### Admin Dashboard
*   **Overview Stats**: View total users, experiences, forum posts, and questions.
*   **User Management**: View and delete users.
*   **Content Management**: Moderate forum posts and interview experiences.

### Companies & Experiences
*   **Company Listings**: Detailed pages with fetched logos and descriptions.
*   **Interview Experiences**: Read real experiences shared by other candidates.
*   **Search & Filter**: Browse experiences by company.

### Forum System
*   **Q&A**: Create threads with tags for discussion.
*   **Replies**: Nested (threaded) replies for deep discussions.
*   **Interaction**: Upvote helpful answers and mark solutions as "Accepted".

### Coding Practice
*   **Problem Sets**: Curated list of coding problems.
*   **Daily Challenge**: Featured problem of the day.

### Graduate Jobs
*   **Live Listings**: Jobs fetched from external APIs.
*   **Search**: Filter by location, salary, and role.

---

## Tech Stack

### Frontend
*   **React** (Vite)
*   **Material UI (MUI)** for premium, responsive design.
*   **Framer Motion** for animations.

### Backend
*   **Node.js** & **Express.js**
*   **MySQL** (using `mysql2`)
*   **JWT** for stateless authentication.
---

## Project Structure

```
PrepBuddy/
 ├── backend/
 │   ├── controllers/      # Logic for API endpoints
 │   ├── routes/           # API route definitions
 │   ├── config/           # DB and env config
 │   ├── middleware/       # Auth and Admin checks
 │   ├── models/           # Database schemas           
 │   └── server.js         # Entry point
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/        # Main application pages
 │   │   ├── components/   # Reusable UI components
 │   │   ├── admin/        # Admin-specific pages
 │   │   └── App.jsx       # Routing logic
 │   └── index.html
 └── README.md
```

---

## Getting Started

### Prerequisites
*   Node.js (v14+)
*   MySQL Database

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/prepbuddy.git
    cd PrepBuddy
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file with:
    # DB_HOST=...
    # DB_USER=...
    # DB_PASS=...
    # DB_NAME=...
    # JWT_SECRET=...
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
---

## API Routes Documentation

### Authentication
```
POST /api/auth/register    - Register a new user
POST /api/auth/login       - Login and receive JWT
GET  /api/auth/all-users   - Get list of all users
```

### Admin (Protected)
```
GET    /api/admin/stats       - Get dashboard statistics
GET    /api/admin/users       - Get all registered users
DELETE /api/admin/users/:id   - Delete a user
```

### Companies
```
GET    /api/companies         - List all companies
GET    /api/companies/:slug   - Get detailed company info
POST   /api/companies/add     - Add a new company
DELETE /api/companies/:id     - Delete a company
```

### Experiences
```
POST   /api/experiences/add           - Submit an experience
GET    /api/experiences/:companyId    - Get experiences for a company
GET    /api/experiences/user/:userId  - Get a user's submitted experiences
```

### Forum
```
GET    /api/forum                     - List all forum posts
POST   /api/forum                     - Create a new post
GET    /api/forum/:id                 - Get post details and replies
DELETE /api/forum/:id                 - Delete a post
POST   /api/forum/:id/reply           - Reply to a post
POST   /api/forum/:id/reply/:parentId - Reply to a reply
POST   /api/forum/reply/:replyId/upvote - Upvote a reply
GET    /api/forum/user/:id            - Get usage history
```

### Graduate Jobs
```
GET    /api/graduateapi/live  - Fetch latest job listings
```

## Database Schema (MySQL)

```sql
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('student','admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  slug VARCHAR(100),
  logo VARCHAR(255),
  description TEXT,
  domain VARCHAR(255)
);

CREATE TABLE experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  company_id INT,
  job_role VARCHAR(100),
  difficulty VARCHAR(50),
  experience_text TEXT,
  questions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  tags VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_reply_id INT NULL
);

CREATE TABLE forum_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  user_id INT,
  reply TEXT,
  parent_id INT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reply_upvotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reply_id INT,
  user_id INT,
  UNIQUE(reply_id, user_id)
);

CREATE TABLE leaderboard (
  user_id INT PRIMARY KEY,
  problems_solved INT DEFAULT 0,
  experiences INT DEFAULT 0,
  forum_answers INT DEFAULT 0,
  score INT DEFAULT 0
);

CREATE TABLE coding_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  difficulty VARCHAR(20),
  link VARCHAR(255)
);

CREATE TABLE graduate_programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(100),
  link VARCHAR(255),
  deadline DATE
);

CREATE TABLE graduate_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(255),
  apply_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

