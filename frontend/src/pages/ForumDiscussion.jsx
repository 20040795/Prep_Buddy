import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Avatar,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForumDiscussion() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetch(`http://localhost:5000/api/forum/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setReplies(data.replies);
      });
  }, [id]);

  const handleReply = () => {
    if (newReply.trim() === "") return;

    fetch(`http://localhost:5000/api/forum/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reply: newReply }),
    })
      .then((res) => res.json())
      .then(() => {
        setReplies([
          ...replies,
          {
            id: Math.random(),
            reply: newReply,
            user_name: user.name,
            created_at: new Date().toISOString(),
            upvotes: 0,
          },
        ]);
        setNewReply("");
      });
  };
  const handleThreadReply = (parentId) => {
    if (newReply.trim() === "") return;

    fetch(`http://localhost:5000/api/forum/${id}/reply/${parentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reply: newReply }),
    })
      .then((res) => res.json())
      .then(() => {
        setReplies([
          ...replies,
          {
            id: Math.random(),
            reply: newReply,
            user_name: user.name,
            parent_id: parentId,
            created_at: new Date().toISOString(),
            upvotes: 0,
          },
        ]);
        setNewReply("");
        setReplyTo(null);
      });
  };
  const handleUpvote = (replyId, index) => {
  fetch(`http://localhost:5000/api/forum/reply/${replyId}/upvote`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Already upvoted") {
        alert("You already upvoted this reply.");
        return;
      }

      setReplies((prev) =>
        prev.map((r) =>
          r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r
        )
      );
    });
};
  const handleAccept = (replyId) => {
    fetch(`http://localhost:5000/api/forum/${id}/accept/${replyId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setPost({ ...post, accepted_reply_id: replyId });
    });
  };

  const renderReplies = (parentId = null, level = 0) => {
    return replies
      .filter((r) => r.parent_id === parentId)
      .map((r, index) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            sx={{
              mb: 2,
              ml: `${level * 30}px`,
              p: 2,
              display: "flex",
              gap: 2,
              borderRadius: 2,
              bgcolor: "#fdfcff",
              border: "1px solid #e0e7ff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Avatar sx={{ bgcolor: "#1565C0", color: "#fff" }}>
              {r.user_name?.charAt(0) || "U"}
            </Avatar>

            <Box>
<Typography
  sx={{
    fontWeight: "bold",
    color: "#0D47A1 !important",
    textShadow: "0 0 2px rgba(0,0,0,0.2)"
  }}
>
  {r.user_name || "User"}
</Typography>


              <Typography sx={{ fontSize: "0.8rem", color: "#777" }}>
                {new Date(r.created_at).toLocaleString()}
              </Typography>

<Typography
  sx={{
    fontWeight: "bold",
    color: "#0D47A1 !important",
    textShadow: "0 0 2px rgba(0,0,0,0.2)"
  }}
>
  {r.reply || "User"}
</Typography>


              <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                <Button
                  size="small"
                  sx={{ color: "#1565C0" }}
                  onClick={() => handleUpvote(r.id, index)}
 
                >
                  ▲ Upvote ({r.upvotes})
                </Button>

                <Button
                  size="small"
                  sx={{ color: "#0D47A1" }}
                  onClick={() => setReplyTo(r.id)}
                >
                  Reply
                </Button>

                {post.accepted_reply_id === r.id && (
                  <Typography sx={{ color: "green", fontWeight: "bold" }}>
                    ✔ Accepted Answer
                  </Typography>
                )}

                {post.user_id === user.id &&
                  !post.accepted_reply_id && (
                    <Button
                      size="small"
                      sx={{ color: "green" }}
                      onClick={() => handleAccept(r.id)}
                    >
                      Mark as Accepted
                    </Button>
                  )}
              </Box>

              {replyTo === r.id && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    placeholder="Write a reply…"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    sx={{
                      bgcolor: "#f0f4ff",
                      "& .MuiInputBase-input": { color: "#0D47A1" },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#1A3E78",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => handleThreadReply(r.id)}
                  >
                    Submit Reply
                  </Button>
                </Box>
              )}
            </Box>
          </Card>

          {renderReplies(r.id, level + 1)}
        </motion.div>
      ));
  };

  if (!post)
    return <Typography sx={{ p: 4 }}>Loading discussion…</Typography>;

  return (
    <Box sx={{ p: 4, background: "#f4f7fc", minHeight: "100vh" }}>
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography sx={{ mt: 1 }}>{post.description}</Typography>
      </Card>

      <Typography variant="h5" sx={{ mb: 2 ,color: "#1a237e"}}>
        Replies ({replies.length})
      </Typography>

      {renderReplies()}
      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6">Write a Reply</Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Share your thoughts..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          sx={{
            mt: 2,
            bgcolor: "#f0f4ff",
            "& .MuiInputBase-input": { color: "#0D47A1" },
          }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleReply}>
          Post Reply
        </Button>
      </Card>
    </Box>
  );
}
