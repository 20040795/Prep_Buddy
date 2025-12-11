import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");
  const [newLink, setNewLink] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/coding")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAdd = () => {
    fetch("http://localhost:5000/api/coding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTitle,
        difficulty: newDifficulty,
        link: newLink,
      }),
    }).then(() => {
      setQuestions([...questions, { title: newTitle, difficulty: newDifficulty, link: newLink }]);
      setNewTitle("");
      setNewDifficulty("");
      setNewLink("");
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/coding/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  };
}