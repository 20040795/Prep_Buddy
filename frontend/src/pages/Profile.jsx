import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [experiences, setExperiences] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    if (!user.id) return;

    // Experiences
    fetch(`http://localhost:5000/api/experiences/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setExperiences(data));

    // Forum Posts
    fetch(`http://localhost:5000/api/forum/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setForumPosts(data));
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f4f7fc" }}>

      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#1565C0",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
            {user.name}'s Profile
          </Typography>
          <Typography sx={{ color: "#555" }}>{user.email}</Typography>
        </Box>
      </Box>

      {/* ACCOUNT DETAILS */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "#ffffff",
          boxShadow: "0 6px 16px rgba(0,0,0,0.07)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Account Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography sx={{ color: "#333", mb: 1 }}>
            <strong>Name:</strong> {user.name}
          </Typography>

          <Typography sx={{ color: "#333", mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography sx={{ color: "#333" }}>
            <strong>Role:</strong> {user.role || "student"}
          </Typography>
        </CardContent>
      </Card>

      {/* EXPERIENCES */}
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "#1565C0" }}
      >
        My Interview Experiences
      </Typography>

      <Grid container spacing={2}>
        {experiences.length === 0 && (
          <Typography sx={{ ml: 2, color: "#777" }}>
            You haven't added any experiences yet.
          </Typography>
        )}

        {experiences.map((exp, index) => (
          <Grid item xs={12} md={6} lg={4} key={exp.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "#ffffff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  height: "160px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#0D47A1" }}
                  >
                    {exp.job_role} @ {exp.company_name}
                  </Typography>

                  <Typography sx={{ mt: 1, color: "#555" }}>
                    {exp.experience_text?.slice(0, 120)}...
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* FORUM POSTS */}
      <Typography
        variant="h5"
        sx={{ mt: 5, mb: 2, fontWeight: "bold", color: "#1565C0" }}
      >
        My Forum Questions
      </Typography>

      <Grid container spacing={2}>
        {forumPosts.length === 0 && (
          <Typography sx={{ ml: 2, color: "#777" }}>
            You haven't posted any forum questions yet.
          </Typography>
        )}

        {forumPosts.map((post, index) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "#ffffff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  height: "150px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#0D47A1" }}
                  >
                    {post.title}
                  </Typography>

                  <Typography sx={{ mt: 1, color: "#555" }}>
                    {post.description?.slice(0, 120)}...
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
