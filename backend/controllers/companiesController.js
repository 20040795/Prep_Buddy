import db from "../config/db.js";
import { fetchCompanyLogo } from "../utils/fetchCompanyLogo.js"; 
export const getAllCompanies = (req, res) => {
  const query = "SELECT * FROM companies ORDER BY name ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    res.json(result);
  });
};
export const getCompanyBySlug = (req, res) => {
  const { slug } = req.params;

  const query = "SELECT * FROM companies WHERE slug = ?";

  db.query(query, [slug], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    if (result.length === 0)
      return res.status(404).json({ message: "Company not found" });

    res.json(result[0]);
  });
};
export const addCompany = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Company name required" });

  const slug = name.toLowerCase().replace(/\s+/g, "-");
  db.query("SELECT * FROM companies WHERE slug = ?", [slug], async (err, existing) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (existing.length > 0) {
      return res.json(existing[0]); 
    }
    const logo = await fetchCompanyLogo(name);

    const insertQuery = `
      INSERT INTO companies (name, slug, logo)
      VALUES (?, ?, ?)
    `;

    db.query(insertQuery, [name, slug, logo], (err2, result2) => {
      if (err2) return res.status(500).json({ message: "Insert error" });

      res.json({
        id: result2.insertId,
        name,
        slug,
        logo,
      });
    });
  });
};
