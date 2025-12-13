import express from "express";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/solved", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ message: "User ID required" });

  updateLeaderboard(user_id, "problems_solved");

  res.json({ message: "Problem count updated" });
});

export default router;
