import db from "../config/db.js";
import { updateLeaderboard } from "./leaderboardController.js";

export const getPosts = (req, res) => {
  const sql = `
    SELECT forum_posts.*, user.name AS user_name
    FROM forum_posts 
    JOIN user ON user.id = forum_posts.user_id
    ORDER BY forum_posts.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
};

export const addPost = (req, res) => {
  const { title, description, tags } = req.body;
  const user_id = req.user.id;

  const sql = `
    INSERT INTO forum_posts (user_id, title, description, tags)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, description, tags], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });

    res.json({ message: "Post added successfully" });
  });
};


export const getPostDetails = (req, res) => {
  const { id } = req.params;

  const postSql = `
    SELECT forum_posts.*, user.name AS user_name
    FROM forum_posts 
    JOIN user ON user.id = forum_posts.user_id
    WHERE forum_posts.id = ?
  `;

  const replySql = `
    SELECT forum_replies.*, user.name AS user_name
    FROM forum_replies
    JOIN user ON user.id = forum_replies.user_id
    WHERE forum_replies.post_id = ?
    ORDER BY forum_replies.created_at ASC
  `;

  db.query(postSql, [id], (err, postResult) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (postResult.length === 0) return res.status(404).json({ message: "Post not found" });

    db.query(replySql, [id], (err2, replyResult) => {
      if (err2) return res.status(500).json({ message: "DB error" });

      res.json({ post: postResult[0], replies: replyResult });
    });
  });
};

export const addReply = (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  const user_id = req.user.id;

  const sql = `
    INSERT INTO forum_replies (post_id, user_id, reply)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id, user_id, reply], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });

    updateLeaderboard(user_id, "forum_answers");

    res.json({ message: "Reply added" });
  });
};
export const upvoteReply = (req, res) => {
  const { replyId } = req.params;
  const user_id = req.user.id;

  const checkSql = `
    SELECT * FROM reply_upvotes WHERE reply_id = ? AND user_id = ?
  `;

  db.query(checkSql, [replyId, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Already upvoted" });
    }
    const insertSql = `
      INSERT INTO reply_upvotes (reply_id, user_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [replyId, user_id], (err2) => {
      if (err2) return res.status(500).json({ message: "Insert error" });

      const updateSql = `
        UPDATE forum_replies 
        SET upvotes = upvotes + 1 
        WHERE id = ?
      `;

      db.query(updateSql, [replyId], (err3) => {
        if (err3) return res.status(500).json({ message: "Update failed" });

        res.json({ message: "Upvoted successfully" });
      });
    });
  });
};


/* ===========================
   ACCEPT ANSWER
=========================== */
export const acceptAnswer = (req, res) => {
  const { id, replyId } = req.params;

  const sql = `
    UPDATE forum_posts 
    SET accepted_reply_id = ?
    WHERE id = ?
  `;

  db.query(sql, [replyId, id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to accept answer" });

    res.json({ message: "Answer accepted" });
  });
};

/* ===========================
   REPLY TO A REPLY (THREADED)
=========================== */
export const replyToReply = (req, res) => {
  const { id, parentId } = req.params;
  const { reply } = req.body;
  const user_id = req.user.id;

  const sql = `
    INSERT INTO forum_replies (post_id, user_id, reply, parent_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [id, user_id, reply, parentId], (err) => {
    if (err) return res.status(500).json({ message: "Thread reply failed" });

    res.json({ message: "Thread reply added" });
  });
};
