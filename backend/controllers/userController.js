import db from "../config/db.js";

export const getUserStats = (req, res) => {
  const stats = {};

  const queries = [
    { key: "experiences", sql: "SELECT COUNT(*) AS total FROM experiences" },
    { key: "forum", sql: "SELECT COUNT(*) AS total FROM forum_posts" },
    { key: "companies", sql: "SELECT COUNT(*) AS total FROM companies" }
  ];

  let completed = 0;

  queries.forEach((q) => {
    db.query(q.sql, (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      stats[q.key] = result[0].total;
      completed++;

      if (completed === queries.length) {
        stats.problems = 0; 
        res.json(stats);
      }
    });
  });
};
