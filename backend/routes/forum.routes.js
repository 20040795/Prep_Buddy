import express from "express";
import { getPosts, addPost, getPostDetails, addReply } from "../controllers/forumController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { deletePost ,getUserForumPosts} from "../controllers/forumController.js";


const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, addPost);
router.get("/:id", getPostDetails);
router.post("/:id/reply", authMiddleware, addReply);
router.delete("/:id", authMiddleware, adminMiddleware, deletePost);
router.get("/user/:userId", getUserForumPosts);  // ⭐ NEW ROUTE

export default router;
