import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/forum")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log("Forum load error:", err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Forum</Typography>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate("/forum/ask")}
      >
        Ask a Question
      </Button>

      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{ p: 2, mt: 3, cursor: "pointer" }}
          onClick={() => navigate(`/forum/${post.id}`)}
        >
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.description}</Typography>
            <Typography sx={{ mt: 1 }}>Tags: {post.tags}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
