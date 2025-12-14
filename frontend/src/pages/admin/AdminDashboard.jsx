import { Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import { API_BASE_URL } from "../config.js";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    users: 0,
    experiences: 0,
    coding: 0,
    forum: 0
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));
  }, []);

  const rows = [
    { title: "Total Users", value: stats.users },
    { title: "Experiences", value: stats.experiences },
    { title: "Coding Questions", value: stats.coding },
    { title: "Forum Posts", value: stats.forum }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {rows.map((s, i) => (
          <Grid item key={i}>
            <StatsCard title={s.title} value={s.value} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Manage Portal
      </Typography>

      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => navigate("/admin/users")}
      >
        Manage Users
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => navigate("/admin/experiences")}
      >
        Manage Experiences
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => navigate("/admin/questions")}
      >
        Manage Coding Questions
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/admin/forum")}
      >
        Manage Forum Posts
      </Button>
    </Box>
  );
}
