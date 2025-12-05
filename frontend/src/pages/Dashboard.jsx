import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name || "Student"}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>

      <Box>
        <Button 
          variant="contained" 
          onClick={() => navigate("/companies")}
          sx={{ mr: 2 }}
        >
          View Companies
        </Button>

        <Button 
          variant="contained" 
          onClick={() => navigate("/add-experience")}
          sx={{ mr: 2 }}
        >
          Add Experience
        </Button>

        <Button 
          variant="contained" 
          onClick={() => navigate("/coding")}
          sx={{ mr: 2 }}
        >
          Coding Practice
        </Button>

        <Button 
          variant="contained" 
          onClick={() => navigate("/forum")}
        >
          Forum
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Dashboard Stats</Typography>
        <Typography>Total Companies: 0</Typography>
        <Typography>Total Interview Experiences: 0</Typography>
        <Typography>Total Coding Questions: 0</Typography>
        <Typography>Total Forum Questions: 0</Typography>
      </Box>
    </Box>
  );
}
