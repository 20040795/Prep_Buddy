import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Deloitte", logo: "https://logotyp.us/file/deloitte.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Accenture", logo: "https://www.pngmart.com/files/23/Accenture-Logo-PNG-HD.png" },
    { name: "PwC", logo: "https://www.pngall.com/wp-content/uploads/15/PWC-Logo-PNG-Image.png" },
  ];

  const stats = [
    { label: "Problems Solved", value: 35, icon: <CodeIcon /> },
    { label: "Experiences Added", value: 5, icon: <WorkIcon /> },
    { label: "Forum Questions", value: 12, icon: <ForumIcon /> },
    { label: "Companies", value: 7, icon: <TrendingUpIcon /> },
  ];

  return (
    <Box
      sx={{
        p: 4,
        backgroundImage: "url('/bk.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            backdropFilter: "blur(10px)",
            boxShadow: 6,
          }}
        >
          <Box sx={{ maxWidth: "55%" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#003366", mb: 1 }}
            >
              Welcome back, {user.name || "Student"} 👋
            </Typography>

            <Typography sx={{ fontSize: "1.1rem", color: "#444", mb: 3 }}>
              Your personalized learning dashboard is ready.  
              Continue growing your skills!
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ px: 4, py: 1.4, borderRadius: 3 }}
              onClick={() => navigate("/coding")}
            >
              Start Coding Practice
            </Button>
          </Box>
          <motion.img
            src="\success.png"
            alt="Student Illustration"
            style={{ width: "260px" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
        </Box>
      </motion.div>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((s, index) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 6,
                  background: "rgba(255,255,255,0.82)",
                  backdropFilter: "blur(6px)",
                  transition: "0.3s",
                  ":hover": { transform: "translateY(-5px)", boxShadow: 12 },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      mx: "auto",
                      mb: 1.5,
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                    }}
                  >
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

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {companies.map((c, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={c.name}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  boxShadow: 4,
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/companies/${c.name.toLowerCase()}`)}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{ width: "55px", marginBottom: "12px" }}
                />
                <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#003366" }}>
        Continue Your Learning Journey
      </Typography>

      <Grid container spacing={3}>
        {[
          {
            title: "Add Experience",
            desc: "Share your interview journey.",
            color: "rgba(255,193,7,0.25)",
            link: "/add-experience",
          },
          {
            title: "Join Forum",
            desc: "Ask and answer questions.",
            color: "rgba(76,175,80,0.22)",
            link: "/forum",
          },
          {
            title: "Graduate Programs",
            desc: "Explore new opportunities.",
            color: "rgba(33,150,243,0.22)",
            link: "/graduates",
          },
        ].map((card, i) => (
          <Grid item xs={12} sm={4} key={card.title}>
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
                }}
                onClick={() => navigate(card.link)}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
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
