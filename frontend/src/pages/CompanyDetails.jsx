import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function CompanyDetails() {
  const { companySlug } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/companies/${companySlug}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
        return fetch(`http://localhost:5000/api/experiences/${data.id}`);
      })
      .then((res) => res.json())
      .then((expData) => setExperiences(expData));
  }, [companySlug]);

  return (
    <Box sx={{ p: 3 }}>
      {company && (
        <Typography variant="h4" gutterBottom>
          {company.name} - Interview Experiences
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={() => navigate("/add-experience")}
        sx={{ mt: 2, mb: 4 }}
      >
        Add Your Experience
      </Button>

      {experiences.length === 0 && (
        <Typography>No experiences available for this company yet.</Typography>
      )}

      {experiences.map((exp) => (
        <Box key={exp.id} mt={2} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="h6">{exp.job_role}</Typography>
          <Typography sx={{ mt: 1 }}>Difficulty: {exp.difficulty}</Typography>
          <Typography sx={{ mt: 1 }}>{exp.experience_text}</Typography>
          <Typography sx={{ mt: 1, fontStyle: "italic" }}>Questions: {exp.questions}</Typography>
          <Typography sx={{ mt: 1, color: "gray" }}>Shared by: {exp.user_name}</Typography>
        </Box>
      ))}
    </Box>
  );
}
