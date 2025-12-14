import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { API_BASE_URL } from "../config.js";

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/experiences/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setExperiences(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/experiences/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setExperiences(experiences.filter((exp) => exp.id !== id));
      });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Manage Experiences</Typography>

      {experiences.map((exp) => (
        <Card key={exp.id} sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography variant="h6">
              {exp.company_name} — {exp.job_role}
            </Typography>
            <Typography>User: {exp.user_name}</Typography>
            <Typography sx={{ mt: 1 }}>{exp.experience_text}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => handleDelete(exp.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
