import express from "express";
import { getUsers, deleteUser } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
