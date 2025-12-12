import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
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
    companies: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/user/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log("Stats load error:", err));
  }, []);

  const cards = [
    { label: "Problems Solved", value: stats.problems, icon: <CodeIcon />, color: "#0f9d58" },
    { label: "Experiences Added", value: stats.experiences, icon: <WorkIcon />, color: "#0f9d58" },
    { label: "Forum Questions", value: stats.forum, icon: <ForumIcon />, color: "#0f9d58" },
    { label: "Companies", value: stats.companies, icon: <TrendingUpIcon />, color: "#0f9d58" },
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
      color: "linear-gradient(135deg, rgba(255,235,205,0.9), rgba(255,243,224,0.9))",
    },
    {
      title: "Join Forum",
      desc: "Ask questions & connect with peers.",
      link: "/forum",
      color: "linear-gradient(135deg, rgba(220,255,231,0.95), rgba(229,252,241,0.95))",
    },
    {
      title: "Graduate Programs",
      desc: "Explore and apply to fresh roles.",
      link: "/graduates",
      color: "linear-gradient(135deg, rgba(206,243,255,0.95), rgba(235,249,255,0.95))",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh", background: "#f3fbf6" }}>
      {/* Header Section - PrepInsta-like green gradient */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            mb: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(90deg, #007a3d 0%, #00b37a 100%)",
            color: "white",
            boxShadow: "0 8px 30px rgba(6, 78, 59, 0.12)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ maxWidth: { xs: "60%", md: "70%" } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
              Welcome back, {user.name || "Student"} 👋
            </Typography>

            <Typography sx={{ mt: 1, mb: 3, opacity: 0.95 }}>
              Your personalized learning dashboard is ready. Continue growing your skills!
            </Typography>

            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 3,
                bgcolor: "white",
                color: "#007a3d",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                '&:hover': { bgcolor: '#f8f8f8' }
              }}
              onClick={() => navigate("/coding")}
            >
              Start Coding Practice
            </Button>
          </Box>

          {/* Illustration - PrepInsta-like (local asset provided by developer) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img src="https://illustrations.popsy.co/white/remote-work.svg" alt="prepinsta-illustration" style={{ width: 260, borderRadius: 12 }} />
          </Box>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cards.map((s, index) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.12 }}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: "0 10px 30px rgba(10, 90, 60, 0.06)", border: "1px solid rgba(6, 78, 59, 0.06)" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: s.color, width: 56, height: 56, mx: "auto", mb: 1.5 }}>
                    {s.icon}
                  </Avatar>

                  <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                    {s.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: 800, color: "#044d2c" }}>
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Top Companies */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#044d2c" }}>
        Top Companies Hiring
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {companies.map((c, index) => (
          <Grid item xs={6} sm={4} md={2} key={c.name}>
            <motion.div whileHover={{ scale: 1.06 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: 2,
                  boxShadow: "none",
                  border: "1px solid rgba(6, 78, 59, 0.06)",
                  background: "white",
                }}
                onClick={() => navigate(`/companies/${c.name.toLowerCase()}`)}
              >
                <img src={c.logo} alt={c.name} style={{ width: 60, marginBottom: 10 }} />
                <Typography sx={{ fontWeight: 600, color: "#0b6b3b" }}>{c.name}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#044d2c" }}>
        Continue Your Journey
      </Typography>

      <Grid container spacing={3}>
        {actionCards.map((card, i) => (
          <Grid item xs={12} sm={4} key={card.title}>
            <motion.div whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.12 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: card.color,
                  cursor: "pointer",
                  border: "1px solid rgba(4, 77, 44, 0.06)",
                }}
                onClick={() => navigate(card.link)}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#044d2c" }}>
                  {card.title}
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>{card.desc}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
