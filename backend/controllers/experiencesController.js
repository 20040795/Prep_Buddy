import db from "../config/db.js";
import { updateLeaderboard } from "./leaderboardController.js";
export const addExperience = (req, res) => {
  const { company_id, job_role, difficulty, experience_text, questions } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO experiences (user_id, company_id, job_role, difficulty, experience_text, questions)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, company_id, job_role, difficulty, experience_text, questions], (err) => {
    if (err) return res.status(500).json({ message: "Error adding experience" });
    updateLeaderboard(user_id, "experiences");

    res.json({ message: "Experience added successfully" });
  });
};
export const getCompanyExperiences = (req, res) => {
  const { companyId } = req.params;

  const query = `
    SELECT experiences.*, user.name AS user_name 
    FROM experiences 
    JOIN user ON user.id = experiences.user_id
    WHERE company_id = ?
  `;

  db.query(query, [companyId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching experiences" });

    res.json(result);
  });
};
export const getAllExperiences = (req, res) => {
  const query = `
    SELECT experiences.*, user.name AS user_name, companies.name AS company_name
    FROM experiences
    JOIN user ON user.id = experiences.user_id
    JOIN companies ON companies.id = experiences.company_id
    ORDER BY experiences.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error loading experiences" });
    res.json(results);
  });
};
export const deleteExperience = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM experiences WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting experience" });

    res.json({ message: "Experience deleted successfully" });
  });

};
export const getUserExperiences = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT experiences.*, companies.name AS company_name
    FROM experiences
    JOIN companies ON companies.id = experiences.company_id
    WHERE experiences.user_id = ?
    ORDER BY experiences.created_at DESC
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching user experiences" });
    }

    res.json(result);
  });
};

