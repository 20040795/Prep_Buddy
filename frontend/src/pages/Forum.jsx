import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f7fb" }}>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1565C0" }}
        >
          Community Forum 💬
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1.2,
            backgroundColor: "#1565C0",
            "&:hover": { backgroundColor: "#0D47A1" }
          }}
          onClick={() => navigate("/forum/ask")}
        >
          Ask a Question
        </Button>
      </Box>

      {/* EMPTY STATE */}
      {posts.length === 0 && (
        <Typography sx={{ color: "#777", fontSize: "1.1rem" }}>
          No questions posted yet. Be the first to ask something!
        </Typography>
      )}

      {/* POST LIST */}
      <Box>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                cursor: "pointer",
                backgroundColor: "#fff",
                boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 25px rgba(21,101,192,0.2)"
                }
              }}
              onClick={() => navigate(`/forum/${post.id}`)}
            >
              <CardContent>
                {/* TITLE */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#0D47A1" }}
                >
                  {post.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography sx={{ mt: 1, color: "#444" }}>
                  {post.description.length > 140
                    ? post.description.substring(0, 140) + "..."
                    : post.description}
                </Typography>

 {/* TAGS */}
{post.tags && post.tags.trim() !== "" && (
  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
    {post.tags
      .split(",")
      .map((tag, i) =>
        tag.trim() !== "" ? (
          <Chip
            key={i}
            label={tag.trim()}
            sx={{
              backgroundColor: "#E3F2FD",
              color: "#1565C0",
              fontWeight: 500
            }}
          />
        ) : null
      )}
  </Stack>
)}


                {/* FOOTER */}
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: "0.85rem",
                    color: "#777"
                  }}
                >
                  Posted by User #{post.user_id}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
