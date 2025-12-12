import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function AdminForum() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/forum")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/forum/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setPosts(posts.filter((p) => p.id !== id));
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Manage Forum Posts</Typography>

      {posts.map((p) => (
        <Card key={p.id} sx={{ mt: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.title}</Typography>
            <Typography>{p.description}</Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              color="error"
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
