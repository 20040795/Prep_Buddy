import mysql from "mysql2";

const db = mysql.createConnection({
  host: "tramway.proxy.rlwy.net",
  user: "root",
  password: "WxShuJPiqXUrbWlcJYFmquOrBKAcRQAP",
  database: "railway",
  port:56882 

});
// # mysql://root:WxShuJPiqXUrbWlcJYFmquOrBKAcRQAP@tramway.proxy.rlwy.net:56882/railway
db.connect(err => {
  if (err) {
    console.error("MySQL Connection Error:", err);
  } else {
    console.log("Connected to MySQL (Railway)");
  }
});

export default db;

