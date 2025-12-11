import db from "../config/db.js";
export const getCodingQuestions = (req, res) => {
  const query = "SELECT * FROM coding_questions ORDER BY id DESC";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching coding questions:", err);
      return res.status(500).json({ message: "Error loading coding questions" });
    }

    res.json(result);
  });
};

export const addCodingQuestion = (req, res) => {
  const { title, difficulty, link } = req.body;

  if (!title || !difficulty || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO coding_questions (title, difficulty, link)
    VALUES (?, ?, ?)
  `;

  db.query(query, [title, difficulty, link], (err) => {
    if (err) {
      console.error("Error adding coding question:", err);
      return res.status(500).json({ message: "Error saving coding question" });
    }

    res.json({ message: "Coding question added successfully" });
  });
};

export const deleteCodingQuestion = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM coding_questions WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting coding question:", err);
      return res.status(500).json({ message: "Error deleting coding question" });
    }

    res.json({ message: "Coding question deleted successfully" });
  });
};
