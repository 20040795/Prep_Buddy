import express from "express";
import { getCodingQuestions,addCodingQuestion,deleteCodingQuestion
} from "../controllers/codingController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCodingQuestions);

//admin can only access
router.post("/", authMiddleware, adminMiddleware, addCodingQuestion);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCodingQuestion);

export default router;
