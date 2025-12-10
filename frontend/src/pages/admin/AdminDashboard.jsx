import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/StatsCard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Users", value: 42 },
    { title: "Experiences", value: 15 },
    { title: "Coding Questions", value: 20 },
    { title: "Forum Posts", value: 18 }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((s, i) => (
          <Grid item key={i}>
            <StatsCard title={s.title} value={s.value} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Manage Portal
      </Typography>

      <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/admin/user")}>
        Manage Users
      </Button>

      <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/admin/experiences")}>
        Manage Experiences
      </Button>

      <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/admin/questions")}>
        Manage Coding Questions
      </Button>

      <Button variant="contained" onClick={() => navigate("/admin/forum")}>
        Manage Forum Posts
      </Button>
    </Box>
  );
}
