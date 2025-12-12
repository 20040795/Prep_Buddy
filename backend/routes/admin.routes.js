import express from "express";
import { getUsers, deleteUser } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";


const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
