import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function CompanyDetails() {
  const { companySlug } = useParams();
  const [company, setCompany] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/companies/${companySlug}`)
      .then(res => res.json())
      .then(data => {
        setCompany(data);

        fetch(`http://localhost:5000/api/experiences/${data.id}`)
          .then(res => res.json())
          .then(exp => setExperiences(exp));
      });
  }, [companySlug]);

  if (!company) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{company.name}</Typography>
      <Typography>{company.description}</Typography>

      <Typography variant="h5" sx={{ mt: 3 }}>Interview Experiences</Typography>
      {experiences.length === 0 && (
        <Typography>No experiences yet</Typography>
      )}

      {experiences.map((exp) => (
        <Box key={exp.id} sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
          <Typography>Role: {exp.job_role}</Typography>
          <Typography>Difficulty: {exp.difficulty}</Typography>
          <Typography sx={{ mt: 1 }}>{exp.experience_text}</Typography>
        </Box>
      ))}
    </Box>
  );
}
