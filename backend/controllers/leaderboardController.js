import db from "../config/db.js";
export const getLeaderboard = (req, res) => {
  const query = `
    SELECT 
      u.name,
      l.user_id,
      l.problems_solved,
      l.experiences,
      l.forum_answers,
      l.score
    FROM leaderboard AS l
    JOIN user AS u ON u.id = l.user_id
    ORDER BY l.score DESC
    LIMIT 50;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log("Leaderboard error:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(result);
  });
};
export const updateLeaderboard = (user_id, field) => {
  const query = `
    UPDATE leaderboard
    SET ${field} = ${field} + 1,
        score = (problems_solved * 2) + (experiences * 5) + (forum_answers * 3)
    WHERE user_id = ?
  `;

  db.query(query, [user_id], (err) => {
    if (err) console.log("Leaderboard update error:", err);
  });
};
