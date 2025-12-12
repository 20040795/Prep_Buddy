import express from "express";
import { getPrograms, addProgram } from "../controllers/graduatesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);

// Only admin can add new graduate program
router.post("/", authMiddleware, adminMiddleware, addProgram);

export default router;
