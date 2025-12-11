import express from "express";
import { addExperience, getCompanyExperiences } from "../controllers/experiencesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", authMiddleware, addExperience);
router.get("/:companyId", getCompanyExperiences);
export default router;
