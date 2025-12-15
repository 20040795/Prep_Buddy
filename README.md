# PrepBuddy – Interview Preparation & Job Portal

PrepBuddy is a full-stack platform for interview preparation, experience sharing, coding practice, forums, and graduate job discovery.

Live Backend:
https://prep-buddy-tic4.onrender.com/
---

## Overview

PrepBuddy enables students to:

* Prepare for interviews through shared real experiences
* Practice coding problems
* Ask and answer questions in a structured forum
* Track contributions via a leaderboard
* Discover graduate jobs with filters

---

## Features

### Authentication

* JWT-based authentication
* Secure password hashing with bcrypt
* Role-based access (`student`, `admin`)

### Companies & Experiences

* Auto-fetch company logos via Google favicon API
* Company listing and detail pages
* Submit interview experiences
* View company-wise and user-wise experiences

### Forum System

* Create posts with tags
* Threaded replies (parent-based)
* One upvote per user per reply
* Accepted answers
* User forum history

### Leaderboard

Score calculation:

```
score = problems_solved * 5
      + experiences * 10
      + forum_answers * 3
```

### Coding Practice

* Categorized coding problems
* Progress tracking

### Graduate Jobs

* Live jobs fetched from external API
* Cached in database
* Filters:

  * keyword search
  * location
  * salary

### Profile Page

* User details
* Submitted experiences
* Forum posts and replies
* Contribution score

---

## Tech Stack

Frontend

* React
* Material UI
* Framer Motion

Backend

* Node.js
* Express.js

Database

* MySQL

Auth

* JWT

Deployment

* Backend: Render
* Database: Railway
* Frontend: Netlify / Vercel

---

## Project Structure

```
PrepBuddy/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── config/
 │   ├── middleware/
 │   ├── db.js
 │   ├── dbexe.js
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── components/
 │   │   └── App.jsx
 │   └── index.html
 └── README.md
```

---

## Database Schema

```sql
CREATE TABLE user(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255),
 role ENUM('student','admin') DEFAULT 'student',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE companies(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 slug VARCHAR(100),
 logo VARCHAR(255),
 description TEXT,
 domain VARCHAR(255)
);

CREATE TABLE experiences(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 company_id INT,
 job_role VARCHAR(100),
 difficulty VARCHAR(50),
 experience_text TEXT,
 questions TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_posts(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 title VARCHAR(255),
 description TEXT,
 tags VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 accepted_reply_id INT NULL
);

CREATE TABLE forum_replies(
 id INT AUTO_INCREMENT PRIMARY KEY,
 post_id INT,
 user_id INT,
 reply TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 upvotes INT DEFAULT 0,
 parent_id INT NULL
);

CREATE TABLE reply_upvotes(
 id INT AUTO_INCREMENT PRIMARY KEY,
 reply_id INT,
 user_id INT,
 UNIQUE(reply_id, user_id)
);

CREATE TABLE leaderboard(
 user_id INT PRIMARY KEY,
 problems_solved INT DEFAULT 0,
 experiences INT DEFAULT 0,
 forum_answers INT DEFAULT 0,
 score INT DEFAULT 0
);

CREATE TABLE graduate_jobs(
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255),
 company VARCHAR(255),
 location VARCHAR(255),
 apply_link VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Routes

### Auth

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/all-users
```

### Companies

```
GET  /api/companies
POST /api/companies/add
GET  /api/companies/:slug
```

### Experiences

```
POST /api/experiences/add
GET  /api/experiences/:companyId
GET  /api/experiences/user/:userId
```

### Forum

```
GET    /api/forum
POST   /api/forum                     (auth)
GET    /api/forum/:id
POST   /api/forum/:id/reply           (auth)
POST   /api/forum/reply/:replyId/upvote       (auth)
POST   /api/forum/:id/reply/:parentId         (auth)
POST   /api/forum/:id/accept/:replyId         (auth)
GET    /api/forum/user/:id
```

### Leaderboard
GET  /api/leaderboard
POST /api/leaderboard/solved
### Graduate Jobs

GET /api/graduateapi/live

## Backend Logic Overview

### Authentication

* Passwords hashed using bcrypt
* JWT issued on login
* authMiddleware protects routes

### Companies

* Logo auto-fetched using:

https://t0.gstatic.com/faviconV2?url=http://<domain>&size=128

### Experiences

* Stored with `user_id`
* Loaded by company and user

### Forum

* Nested replies via `parent_id`
* Upvotes tracked per user
* Accepted answer stored in post

### Graduate Jobs

* External API → cached in DB → served to frontend
