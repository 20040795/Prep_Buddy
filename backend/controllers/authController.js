import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ============================
      REGISTER USER
============================ */
export const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const checkUserSql = "SELECT id FROM user WHERE email = ?";

  db.query(checkUserSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserSql =
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";

    db.query(insertUserSql, [name, email, hashedPassword], (err2, result2) => {
      if (err2) return res.status(500).json({ message: "Insert error" });

      const newUserId = result2.insertId;

      // Create default leaderboard entry
      const leaderboardSql =
        "INSERT INTO leaderboard (user_id, problems_solved, experiences, forum_answers, score) VALUES (?, 0, 0, 0, 0)";

      db.query(leaderboardSql, [newUserId], (err3) => {
        if (err3) console.log("Leaderboard insert error:", err3);
      });

      return res.json({
        message: "User registered successfully",
        user_id: newUserId,
      });
    });
  });
};

/* ============================
         LOGIN USER
============================ */
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const findUserSql = "SELECT * FROM user WHERE email = ?";

  db.query(findUserSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};
export const getAllUsers = (req, res) => {
  const sql = "SELECT id, name, email, role FROM user";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    return res.json({ users: result });
  });
};
