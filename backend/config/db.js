import mysql from "mysql2";
//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",      
  database: "dbs_portal"
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

export default db;
