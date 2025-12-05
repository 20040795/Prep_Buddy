import db from "./db.js";
export const initializeDatabase = () => {
    //first we r creating user table , if not created that is if the user table is not existing in the dbs_portal db only it gets created
  const usersTable = `
    CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),email VARCHAR(100) UNIQUE,password VARCHAR(255),role ENUM('student', 'admin') DEFAULT 'student',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
  db.query(usersTable, (err) => {
    if (err) console.log("Error creating users table:", err);
    else console.log("Users table ready");
  });
}