import db from "../config/db.js";

//post
export const addExperience = (req, res) => {
  const { company_id, job_role, difficulty, experience_text, questions } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO experiences (user_id, company_id, job_role, difficulty, experience_text, questions)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, company_id, job_role, difficulty, experience_text, questions], (err) => {
    if (err) return res.status(500).json({ message: "Error adding experience" });

    res.json({ message: "Experience added successfully" });
  });
};
export const getCompanyExperiences = (req, res) => {
  const { companyId } = req.params;

  const query = `
    select experiences.*, user.name AS user_name 
    from experiences 
    join user on user.id = experiences.user_id
    where company_id = ?
  `;

  db.query(query, [companyId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching experiences" });

    res.json(result);
  });
};
