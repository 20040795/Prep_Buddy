import { useState } from "react";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Reverse Linked List", difficulty: "Easy" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");

  const handleAddQuestion = () => {
    if (!newTitle.trim() || !newDifficulty.trim()) {
      alert("Please enter both fields");
      return;
    }

    const newQuestion = {
      id: questions.length + 1,
      title: newTitle,
      difficulty: newDifficulty,
    };

    setQuestions([...questions, newQuestion]);
    setNewTitle("");
    setNewDifficulty("");

    alert("Question added (placeholder)");
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    alert("Question deleted (placeholder): " + id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Coding Questions
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Add New Question</Typography>

        <TextField
          fullWidth
          label="Question Title"
          sx={{ mt: 2 }}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Difficulty (Easy / Medium / Hard)"
          sx={{ mt: 2 }}
          value={newDifficulty}
          onChange={(e) => setNewDifficulty(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Existing Questions
      </Typography>

      {questions.map((q) => (
        <Card key={q.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{q.title}</Typography>
            <Typography>Difficulty: {q.difficulty}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
              onClick={() => handleDelete(q.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
