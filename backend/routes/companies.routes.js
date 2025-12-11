import express from "express";
import { getAllCompanies, getCompanyBySlug } from "../controllers/companiesController.js";
const router = express.Router();
router.get("/", getAllCompanies);
router.get("/:slug", getCompanyBySlug);
export default router;
