import db from "../config/db.js";

export const getCodingQuestions = (req, res) => {
  db.query("SELECT * FROM coding_questions", (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
};

export const addCodingQuestion = (req, res) => {
  const { title, difficulty, link } = req.body;
  const query = `INSERT INTO coding_questions (title, difficulty, link) VALUES (?, ?, ?)`;

  db.query(query, [title, difficulty, link], (err) => {
    if (err) return res.status(500).json({ message: "DB insert error" });
    res.json({ message: "Question added successfully" });
  });
};

export const deleteCodingQuestion = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM coding_questions WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "DB delete error" });
    res.json({ message: "Question deleted" });
  });
};
