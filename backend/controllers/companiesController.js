import db from "../config/db.js";
export const getAllCompanies = (req, res) => {
  const query = "SELECT * FROM companies";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    res.json(result);
  });
};
export const getCompanyBySlug = (req, res) => {
  const slug = req.params.slug;

  const query = "select * from companies where slug = ?";

  db.query(query, [slug], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    if (result.length === 0)
      return res.status(404).json({ message: "Company not found" });

    res.json(result[0]);
  });
};
