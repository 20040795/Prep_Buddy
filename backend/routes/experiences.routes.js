import express from "express";
import { addExperience, getCompanyExperiences } from "../controllers/experiencesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllExperiences, deleteExperience } from "../controllers/experiencesController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = express.Router();
router.post("/", authMiddleware, addExperience);
router.get("/:companyId", getCompanyExperiences);
router.get("/all", authMiddleware, adminMiddleware, getAllExperiences);
router.delete("/:id", authMiddleware, adminMiddleware, deleteExperience);

export default router;
