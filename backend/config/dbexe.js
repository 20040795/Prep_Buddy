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
  const experiencesTable = `
    CREATE TABLE IF NOT EXISTS experiences (id INT AUTO_INCREMENT PRIMARY KEY,user_id INT,company_id INT,job_role VARCHAR(100),difficulty VARCHAR(20),experience_text TEXT,questions TEXT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); `;
  db.query(experiencesTable, (err) => {
    if (err) console.log("Error creating experiences table:", err);
    else console.log(" Experiences table ready");
  });

  const codingTable = `CREATE TABLE IF NOT EXISTS coding_questions (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255),difficulty VARCHAR(20), link VARCHAR(255) );`;
  db.query(codingTable, (err) => {
    if (err) console.log("Error creating coding table:", err);
    else console.log("Coding Questions table ready");
  });


};
