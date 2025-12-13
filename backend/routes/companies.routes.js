import express from "express";
import {
  getAllCompanies,
  getCompanyBySlug,
  addCompany
} from "../controllers/companiesController.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:slug", getCompanyBySlug);

// used when adding a new experience
router.post("/add", addCompany);

export default router;
