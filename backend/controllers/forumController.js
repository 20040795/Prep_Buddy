import db from "../config/db.js";

export const getPosts = (req, res) => {
  db.query("SELECT * FROM forum_posts", (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
};

export const addPost = (req, res) => {
  const { title, description, tags } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO forum_posts (user_id, title, description, tags)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [user_id, title, description, tags], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });
    res.json({ message: "Post added successfully" });
  });
};

export const getPostDetails = (req, res) => {
  const { id } = req.params;

  const postQuery = `SELECT * FROM forum_posts WHERE id = ?`;
  const repliesQuery = `SELECT * FROM forum_replies WHERE post_id = ?`;

  db.query(postQuery, [id], (err, postResult) => {
    if (err) return res.status(500).json({ message: "DB error" });

    db.query(repliesQuery, [id], (err2, repliesResult) => {
      if (err2) return res.status(500).json({ message: "DB error" });

      res.json({
        post: postResult[0],
        replies: repliesResult
      });
    });
  });
};

export const addReply = (req, res) => {
  const { id } = req.params;
  const { reply_text } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO forum_replies (post_id, user_id, reply_text)
    VALUES (?, ?, ?)
  `;

  db.query(query, [id, user_id, reply_text], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });
    res.json({ message: "Reply added" });
  });
};
