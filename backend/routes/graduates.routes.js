import express from "express";
import { getPrograms, addProgram } from "../controllers/graduatesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);
router.post("/", authMiddleware, addProgram);

export default router;
