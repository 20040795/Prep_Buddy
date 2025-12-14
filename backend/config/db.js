import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 👈 CRITICAL FIX

import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

export default db;
