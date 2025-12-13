import db from "../config/db.js";

export const getStats = (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) AS count FROM user",
    experiences: "SELECT COUNT(*) AS count FROM experiences",
    forum_posts: "SELECT COUNT(*) AS count FROM forum_posts",
    companies: "SELECT COUNT(*) AS count FROM companies",
    coding: "SELECT COUNT(*) AS count FROM coding_questions",
    leaderboard: "SELECT user_id, score FROM leaderboard ORDER BY score DESC LIMIT 3"
  };

  const results = {};


  let completed = 0;
  const total = Object.keys(queries).length;

  for (let key in queries) {
    db.query(queries[key], (err, resData) => {
      completed++;

      if (err) results[key] = null;
      else results[key] = resData;

      if (completed === total) {
        res.json(results);
      }
    });
  }
};
