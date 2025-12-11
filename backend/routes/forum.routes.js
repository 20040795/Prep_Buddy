import express from "express";
import { getPosts, addPost, getPostDetails, addReply } from "../controllers/forumController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, addPost);
router.get("/:id", getPostDetails);
router.post("/:id/reply", authMiddleware, addReply);

export default router;
