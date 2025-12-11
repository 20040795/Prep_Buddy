import db from "../config/db.js";

export const getPrograms = (req, res) => {
  db.query("SELECT * FROM graduate_programs", (err, result) => {
    if (err) return res.status(500).json({ message: "Error loading programs" });
    res.json(result);
  });
};

export const addProgram = (req, res) => {
  const { company, link, deadline } = req.body;

  const query = `
    INSERT INTO graduate_programs (company, link, deadline)
    VALUES (?, ?, ?)
  `;

  db.query(query, [company, link, deadline], (err) => {
    if (err) return res.status(500).json({ message: "Error saving program" });
    res.json({ message: "Program added successfully" });
  });
};
