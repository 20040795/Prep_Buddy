import db from "../config/db.js";

export const getPosts = (req, res) => {
  db.query("select * from forum_posts", (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
};

export const addPost = (req, res) => {
  const { title, description, tags } = req.body;
  const user_id = req.user.id;

  const query = `
    insert into forum_posts (user_id, title, description, tags)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [user_id, title, description, tags], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });
    res.json({ message: "Post added successfully" });
  });
};

export const getPostDetails = (req, res) => {
  const { id } = req.params;

  const postQuery = `select * from forum_posts WHERE id = ?`;
  const repliesQuery = `select * from forum_replies WHERE post_id = ?`;

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
  const { reply } = req.body;   
  const user_id = req.user.id;

  const query = `
    insert into forum_replies (post_id, user_id, reply)
    VALUES (?, ?, ?)
  `;

  db.query(query, [id, user_id, reply], (err) => {
    if (err) return res.status(500).json({ message: "Insert error" });
    res.json({ message: "Reply added" });
  });
};

export const deletePost = (req, res) => {
  const { id } = req.params;

  const query = "delete from forum_posts WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting post" });
    db.query("delete from forum_replies WHERE post_id = ?", [id]);

    res.json({ message: "Post deleted successfully" });
  });
};
