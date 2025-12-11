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
