import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ForumDiscussion() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/forum/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setReplies(data.replies);
      });
  }, [id]);

  const handleReply = () => {
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
        setReplies([...replies, { reply: newReply }]);
        setNewReply("");
      });
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography sx={{ mt: 1 }}>{post.description}</Typography>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Replies
      </Typography>

      {replies.map((r, i) => (
        <Box key={i} sx={{ mt: 2, p: 2, border: "1px solid #bbb" }}>
          <Typography>{r.reply}</Typography>
        </Box>
      ))}

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        label="Write a reply"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleReply}>
        Add Reply
      </Button>
    </Box>
  );
}
