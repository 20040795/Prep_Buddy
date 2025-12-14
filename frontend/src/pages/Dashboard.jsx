import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config.js";

import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [stats, setStats] = useState(null);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          problems: data.coding?.[0]?.count || 0,
          experiences: data.experiences?.[0]?.count || 0,
          forum: data.forum_posts?.[0]?.count || 0,
          companies: data.companies?.[0]?.count || 0,
        });

        if (data.leaderboard) {
          fetch(`${API_BASE_URL}/api/auth/all-users`)
            .then((res) => res.json())
            .then((result) => {
              const users = result.users || result;
              const merged = data.leaderboard.map((u) => ({
                ...u,
                name: users.find((x) => x.id === u.user_id)?.name || "Unknown"
              }));
              setTopUsers(merged);
            });
        }
      })
      .catch((err) => console.log("Stats load error:", err));
  }, []);

  const statCards = [
    { label: "Problems Solved", value: stats?.problems || 0, icon: <CodeIcon />, color: "#FFB300" },
    { label: "Experiences Added", value: stats?.experiences || 0, icon: <WorkIcon />, color: "#29B6F6" },
    { label: "Forum Questions", value: stats?.forum || 0, icon: <ForumIcon />, color: "#66BB6A" },
    { label: "Companies", value: stats?.companies || 0, icon: <TrendingUpIcon />, color: "#AB47BC" },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Deloitte", logo: "https://logotyp.us/file/deloitte.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  ];

  const actionCards = [
    { title: "Add Experience", desc: "Share your interview journey.", link: "/add-experience", color: "#FFF59D" },
    { title: "Join Forum", desc: "Ask questions & connect with peers.", link: "/forum", color: "#A5D6A7" },
    { title: "Graduate Programs", desc: "Explore fresh graduate opportunities.", link: "/graduates", color: "#81D4FA" },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        backgroundColor: "#f7f9fc"
      }}
    >
      {/* ================= HEADER ================= */}
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            mb: 5,
            borderRadius: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            background: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1976D2",
                fontSize: { xs: "1.6rem", md: "2.2rem" }
              }}
            >
              Welcome back, {user.name || "Student"} 👋
            </Typography>

            <Typography sx={{ mt: 1, mb: 3, color: "#333" }}>
              Your personalized learning dashboard is ready.
            </Typography>

            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: "#1976D2",
                "&:hover": { backgroundColor: "#1565C0" }
              }}
              onClick={() => navigate("/coding")}
            >
              Start Coding Practice
            </Button>
          </Box>

          <img
            src="https://illustrations.popsy.co/white/remote-work.svg"
            alt="dashboard"
            style={{ width: "100%", maxWidth: 240 }}
          />
        </Box>
      </motion.div>

      {/* ================= STATS ================= */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 6 }}>
        {statCards.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: s.color, mx: "auto", mb: 1.5 }}>
                    {s.icon}
                  </Avatar>
                  <Typography>{s.label}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ================= LEADERBOARD ================= */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#1976D2" }}>
        Top Performers 🎖️
      </Typography>

      <Grid container spacing={2} sx={{ mb: 6 }}>
        {topUsers.length === 0 && (
          <Typography sx={{ ml: 2 }}>No leaderboard data yet.</Typography>
        )}

        {topUsers.map((u, i) => (
          <Grid item xs={12} sm={6} md={4} key={u.user_id}>
            <Card sx={{ p: 2, borderRadius: 3, background: "#E3F2FD" }}>
              <Typography fontWeight="bold">
                #{i + 1} – {u.name}
              </Typography>
              <Typography>Score: {u.score}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= COMPANIES ================= */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#1976D2" }}>
        Top Companies Hiring
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {companies.map((c, i) => (
          <Grid item xs={6} sm={4} md={2} key={c.name}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card
                sx={{
                  p: 2,
                  height: { xs: 120, md: 150 },
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`/companies/${c.name.toLowerCase()}`)}
              >
                <img src={c.logo} alt={c.name} style={{ width: 60 }} />
                <Typography fontWeight={700}>{c.name}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ================= ACTIONS ================= */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#1976D2" }}>
        Continue Your Journey
      </Typography>

      <Grid container spacing={3}>
        {actionCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: card.color,
                  cursor: "pointer"
                }}
                onClick={() => navigate(card.link)}
              >
                <Typography fontWeight={600}>{card.title}</Typography>
                <Typography>{card.desc}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
