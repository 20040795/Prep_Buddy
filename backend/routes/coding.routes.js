import express from "express";
import { getCodingQuestions, addCodingQuestion, deleteCodingQuestion } from "../controllers/codingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCodingQuestions);
router.post("/", authMiddleware, addCodingQuestion);
router.delete("/:id", authMiddleware, deleteCodingQuestion);

export default router;
