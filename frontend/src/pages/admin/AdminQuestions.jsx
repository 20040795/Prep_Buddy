import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [link, setLink] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/coding")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const addQuestion = () => {
    fetch("http://localhost:5000/api/coding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, difficulty, link }),
    }).then(() => {
      setQuestions([...questions, { title, difficulty, link }]);
      setTitle("");
      setDifficulty("");
      setLink("");
    });
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:5000/api/coding/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Manage Coding Questions</Typography>

      <TextField fullWidth sx={{ mt: 2 }} label="Title"
        value={title} onChange={e => setTitle(e.target.value)} />

      <TextField fullWidth sx={{ mt: 2 }} label="Difficulty"
        value={difficulty} onChange={e => setDifficulty(e.target.value)} />

      <TextField fullWidth sx={{ mt: 2 }} label="Link"
        value={link} onChange={e => setLink(e.target.value)} />

      <Button variant="contained" sx={{ mt: 2 }} onClick={addQuestion}>
        Add Question
      </Button>

      {questions.map((q) => (
        <Card key={q.id} sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography>{q.title}</Typography>
            <Typography>{q.difficulty}</Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
              onClick={() => deleteQuestion(q.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
