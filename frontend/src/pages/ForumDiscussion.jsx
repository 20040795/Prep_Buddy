import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function ForumDiscussion() {
  const { id } = useParams();
  const question = {
    id,
    title: "How to prepare for google interview?",
    description: "I am confused about what topics to focus on. Please guide me.",
    tags: "coding, preparation",
  };
  const [replies, setReplies] = useState([
    { id: 1, text: "Practice arrays, strings, DP and SQL." },
    { id: 2, text: "Focus on LeetCode easy + medium first." },
  ]);

  const [newReply, setNewReply] = useState("");

  const handleAddReply = () => {
    if (newReply.trim() === "") return;

    const newReplyObj = {
      id: replies.length + 1,
      text: newReply,
    };

    setReplies([...replies, newReplyObj]);
    setNewReply("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {question.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {question.description}
      </Typography>

      <Typography variant="body2" sx={{ mb: 4 }}>
        Tags: {question.tags}
      </Typography>

      <Typography variant="h6">Replies:</Typography>

      {replies.map((reply) => (
        <Box key={reply.id} sx={{ mt: 2 }}>
          <Typography>• {reply.text}</Typography>
        </Box>
      ))}

      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Add your reply"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAddReply}
        >
          Submit Reply
        </Button>
      </Box>
    </Box>
  );
}
