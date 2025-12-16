import db from "./db.js";
import bcrypt from "bcryptjs";

export const initializeDatabase = () => {

  const usersTable = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role ENUM('student', 'admin') DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(usersTable, (err) =>
    err ? console.log("Error creating user table:", err) : console.log("User table ready")
  );

  const companiesTable = `
    CREATE TABLE IF NOT EXISTS companies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      slug VARCHAR(100),
      logo VARCHAR(255),
      description TEXT
    );
  `;
  db.query(companiesTable, (err) =>
    err ? console.log("Error creating companies table:", err) : console.log("Companies table ready")
  );
  const experiencesTable = `
    CREATE TABLE IF NOT EXISTS experiences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      company_id INT,
      job_role VARCHAR(100),
      difficulty VARCHAR(20),
      experience_text TEXT,
      questions TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(experiencesTable, (err) =>
    err ? console.log("Error creating experiences table:", err) : console.log("Experiences table ready")
  );

  const codingTable = `
    CREATE TABLE IF NOT EXISTS coding_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      difficulty VARCHAR(20),
      link VARCHAR(255)
    );
  `;
  db.query(codingTable, (err) =>
    err ? console.log("Error creating coding table:", err) : console.log("Coding Questions table ready")
  );
  const forumTable = `
    CREATE TABLE IF NOT EXISTS forum_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255),
      description TEXT,
      tags VARCHAR(100),
      accepted_reply_id INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(forumTable, (err) =>
    err ? console.log("Error creating forum table:", err) : console.log("Forum table ready")
  );

  const gradTable = `
    CREATE TABLE IF NOT EXISTS graduate_programs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company VARCHAR(100),
      link VARCHAR(255),
      deadline DATE
    );
  `;
  db.query(gradTable, (err) =>
    err ? console.log("Error creating graduate programs table:", err) : console.log("Graduate Programs table ready")
  );


  const repliesTable = `
    CREATE TABLE IF NOT EXISTS forum_replies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT,
      user_id INT,
      reply TEXT,
      parent_id INT NULL,
      upvotes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(repliesTable, (err) =>
    err ? console.log("Error creating replies table:", err) : console.log("Replies table ready")
  );

  const upvoteTable = `
    CREATE TABLE IF NOT EXISTS reply_upvotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      reply_id INT,
      user_id INT,
      UNIQUE KEY unique_upvote (reply_id, user_id)
    );
  `;
  db.query(upvoteTable, (err) =>
    err ? console.log("Error creating upvotes table:", err) : console.log("Upvotes table ready")
  );

  const leaderboardTable = `
    CREATE TABLE IF NOT EXISTS leaderboard (
      user_id INT PRIMARY KEY,
      problems_solved INT DEFAULT 0,
      experiences INT DEFAULT 0,
      forum_answers INT DEFAULT 0,
      score INT DEFAULT 0
    );
  `;
  db.query(leaderboardTable, (err) =>
    err ? console.log("Error creating leaderboard:", err) : console.log("Leaderboard table ready")
  );

  const graduateJobs = `
    CREATE TABLE IF NOT EXISTS graduate_jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      company VARCHAR(255),
      location VARCHAR(255),
      apply_link VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(graduateJobs, (err) =>
    err ? console.log("Error creating graduate jobs table:", err) : console.log("Graduate jobs ready")
  );
  const seedAdmin = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const checkAdmin = "SELECT * FROM user WHERE email = 'admin@admin.com'";

    db.query(checkAdmin, (err, result) => {
      if (err) console.log("Error checking admin:", err);
      if (result.length === 0) {
        const insertAdmin = `
          INSERT INTO user (name, email, password, role)
          VALUES ('Admin', 'admin@admin.com', ?, 'admin')
        `;
        db.query(insertAdmin, [hashedPassword], (err) => {
          if (err) console.log("Error seeding admin:", err);
          else console.log("Admin user seeded successfully");
        });
      } else {
        console.log("Admin user already exists");
      }
    });
  };

  seedAdmin();
};
