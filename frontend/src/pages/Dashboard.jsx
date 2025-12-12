import {Box,Typography,Grid,Card,CardContent,Button,Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [stats, setStats] = useState({
    problems: 0,
    experiences: 0,
    forum: 0,
    companies: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/user/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log("Stats load error:", err));
  }, []);

  const cards = [
    { label: "Problems Solved", value: stats.problems, icon: <CodeIcon />, color: "primary.main" },
    { label: "Experiences Added", value: stats.experiences, icon: <WorkIcon />, color: "primary.main" },
    { label: "Forum Questions", value: stats.forum, icon: <ForumIcon />, color: "primary.main" },
    { label: "Companies", value: stats.companies, icon: <TrendingUpIcon />, color: "primary.main" },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Deloitte", logo: "https://logotyp.us/file/deloitte.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.8)",
            boxShadow: 6,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003366" }}>
              Welcome back, {user.name || "Student"} 👋
            </Typography>

            <Typography sx={{ mt: 1, mb: 3, color: "#444" }}>
              Your personalized learning dashboard is ready. Continue growing your skills!
            </Typography>

            <Button
              variant="contained"
              sx={{ px: 4, py: 1.4, borderRadius: 3 }}
              onClick={() => navigate("/coding")}
            >
              Start Coding Practice
            </Button>
          </Box>

          <img src="\success.png" style={{ width: 240 }} />
        </Box>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cards.map((s, index) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: s.color, width: 56, height: 56, mx: "auto", mb: 1.5 }}>
                    {s.icon}
                  </Avatar>

                  <Typography variant="h6">{s.label}</Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#003366" }}>
        Top Companies Hiring
      </Typography>

      <Grid container spacing={3}>
        {companies.map((c, index) => (
          <Grid item xs={6} sm={4} md={2} key={c.name}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{ p: 2, textAlign: "center", cursor: "pointer" }}
                onClick={() => navigate(`/companies/${c.name.toLowerCase()}`)}
              >
                <img src={c.logo} alt={c.name} style={{ width: 55, marginBottom: 12 }} />
                <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
