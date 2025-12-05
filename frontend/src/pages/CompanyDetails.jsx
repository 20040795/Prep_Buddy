import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function CompanyDetails() {
  const { companySlug } = useParams();
  const navigate = useNavigate();
  const experiences = [
    {
      id: 1,
      title: " bla bla",
      summary: "Good exp",
    },
    {
      id: 2,
      title: "bla bla 2",
      summary: "tough",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {companySlug.toUpperCase()} - Interview Experiences
      </Typography>

      <Button 
        variant="contained" 
        onClick={() => navigate("/add-experience")}
        sx={{ mt: 2, mb: 4 }}
      >
        Add Your Experience
      </Button>

      {experiences.map((exp) => (
        <Box key={exp.id} mt={2}>
          <Typography variant="h6">{exp.title}</Typography>
          <Typography>{exp.summary}</Typography>
        </Box>
      ))}
    </Box>
  );
}
