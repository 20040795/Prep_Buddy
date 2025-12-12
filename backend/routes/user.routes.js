import express from "express";
import { getUserStats } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//getting stats for dashboard
router.get("/stats", authMiddleware, getUserStats);

export default router;
