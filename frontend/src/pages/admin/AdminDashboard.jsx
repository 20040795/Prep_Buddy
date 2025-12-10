import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
    { label: "Total Users", value: 42 },
    { label: "Interview Experiences", value: 15 },
    { label: "Coding Questions", value: 20 },
    { label: "Forum Posts", value: 18 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 220, p: 2 }}>
              <CardContent>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Manage Portal
      </Typography>

      <Box>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => navigate("/admin/user")}
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
    </Box>
  );
}
