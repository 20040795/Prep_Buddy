import db from "../config/db.js";
export const getUsers = (req, res) => {
  const sql = "SELECT id, name, email, role FROM user";

  db.query(sql, (err, users) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(users);
  });
};
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM user WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });

    res.json({ message: "User deleted" });
  });
};
export const getAdminStats = (req, res) => {
  const stats = {};

  const queries = [
    { key: "users", sql: "SELECT COUNT(*) AS total FROM user" },
    { key: "experiences", sql: "SELECT COUNT(*) AS total FROM experiences" },
    { key: "coding", sql: "SELECT COUNT(*) AS total FROM coding_questions" },
    { key: "forum", sql: "SELECT COUNT(*) AS total FROM forum_posts" }
  ];

  let completed = 0;

  queries.forEach((q) => {
    db.query(q.sql, (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      stats[q.key] = result[0].total;
      completed++;

      if (completed === queries.length) {
        res.json(stats);
      }
    });
  });
};

