import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AskQuestion() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    console.log({
      title,
      description,
      tags
    });

    alert("Question submitted (placeholder).");
    navigate("/forum");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ask a Question
      </Typography>

      <Box mt={2}>
        <TextField
          fullWidth
          label="Question Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>

      <Box mt={2}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your question"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box mt={2}>
        <TextField
          fullWidth
          label="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Submit Question
      </Button>
    </Box>
  );
}
