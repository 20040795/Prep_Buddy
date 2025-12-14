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

        // FETCH USERS FOR LEADERBOARD
        if (data.leaderboard) {
          fetch(`${API_BASE_URL}/api/auth/all-users`)
            .then((res) => res.json())
            .then((result) => {
              const userList = result.users || result; 

              const merged = data.leaderboard.map((u) => ({
                ...u,
                name: userList.find((x) => x.id == u.user_id)?.name || "Unknown"
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
    {
      title: "Add Experience",
      desc: "Share your interview journey.",
      link: "/add-experience",
      color: "#FFF59D"
    },
    {
      title: "Join Forum",
      desc: "Ask questions & connect with peers.",
      link: "/forum",
      color: "#A5D6A7"
    },
    {
      title: "Graduate Programs",
      desc: "Explore fresh graduate opportunities.",
      link: "/graduates",
      color: "#81D4FA"
    }
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f7f9fc" }}>

      {/* ================= HEADER ================= */}
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976D2" }}>
              Welcome back, {user.name || "Student"} 👋
            </Typography>

            <Typography sx={{ mt: 1, mb: 3, color: "#333" }}>
              Your personalized learning dashboard is ready. Continue growing your skills!
            </Typography>

            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: "#1976D2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565C0" }
              }}
              onClick={() => navigate("/coding")}
            >
              Start Coding Practice
            </Button>
          </Box>

          <img src="https://illustrations.popsy.co/white/remote-work.svg" style={{ width: 240 }} />
        </Box>
      </motion.div>

      {/* ================= STATS CARDS ================= */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {statCards.map((s, index) => (
<Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: s.color, width: 56, height: 56, mx: "auto", mb: 1.5 }}>
                    {s.icon}
                  </Avatar>

                  <Typography variant="h6" sx={{ color: "#333" }}>{s.label}</Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold", color: "#000" }}>
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ================= TOP USERS (LEADERBOARD) ================= */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}>
        Top Performers 🎖️
      </Typography>

      <Grid container spacing={2} sx={{ mb: 6 }}>
        {topUsers.length === 0 && (
          <Typography sx={{ ml: 2, color: "#555" }}>No leaderboard data yet.</Typography>
        )}

        {topUsers.map((u, index) => (
<Grid key={u.user_id} size={{ xs: 12, sm: 4 }}>
            <Card sx={{ p: 2, borderRadius: 3, background: "#E3F2FD", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                  #{index + 1} – {u.name}
                </Typography>

                <Typography sx={{ mt: 1, color: "#333" }}>Score: {u.score}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= COMPANIES (CREATIVE) ================= */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}>
        Top Companies Hiring
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {companies.map((c, index) => (
<Grid key={c.name} size={{ xs: 6, sm: 4, md: 2 }}>
            <motion.div
              whileHover={{ scale: 1.12, rotate: 1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
            >
              <Card
                sx={{
                  p: 2,
                  height: 150,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 12px 30px rgba(25,118,210,0.25)",
                    background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)"
                  }
                }}
                onClick={() => navigate(`/companies/${c.name.toLowerCase()}`)}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{ width: 60, height: 60, objectFit: "contain", marginBottom: 10 }}
                />

                <Typography sx={{ fontWeight: 700, color: "#0D47A1", fontSize: "0.95rem" }}>
                  {c.name}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ================= ACTION CARDS ================= */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976D2" }}>
        Continue Your Journey
      </Typography>

      <Grid container spacing={3}>
        {actionCards.map((card, i) => (
<Grid key={card.title} size={{ xs: 12, sm: 4 }}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: card.color,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
                }}
                onClick={() => navigate(card.link)}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
                  {card.title}
                </Typography>
                <Typography sx={{ mt: 1, color: "#555" }}>
                  {card.desc}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}
