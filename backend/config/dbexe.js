import db from "./db.js";
export const initializeDatabase = () => {
    //first we r creating user table , if not created that is if the user table is not existing in the dbs_portal db only it gets created
  const usersTable = `
    CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),email VARCHAR(100) UNIQUE,password VARCHAR(255),role ENUM('student', 'admin') DEFAULT 'student',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
  db.query(usersTable, (err) => {
    if (err) console.log("Error creating users table:", err);
    else console.log("Users table ready");
  });
  const companiesTable = `
    CREATE TABLE IF NOT EXISTS companies (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),slug VARCHAR(100),logo VARCHAR(255),description TEXT);`;
  db.query(companiesTable, (err) => {
    if (err) console.log("Error creating companies table:", err);
    else console.log("Companies table ready");
  });
  
};
