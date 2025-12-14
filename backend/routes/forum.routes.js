import express from "express";
import {
  getPosts,
  addPost,
  getPostDetails,
  addReply,
  replyToReply,
  upvoteReply,
  acceptAnswer
} from "../controllers/forumController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT id, title, description, created_at
    FROM forum_posts
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  req.db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    return res.json(results);
  });
});
router.post("/", authMiddleware, addPost);
router.get("/:id", getPostDetails);
router.post("/:id/reply", authMiddleware, addReply);
router.post("/:id/reply/:parentId", authMiddleware, replyToReply);
router.post("/reply/:replyId/upvote", authMiddleware, upvoteReply);
router.post("/:id/accept/:replyId", authMiddleware, acceptAnswer);

export default router;
