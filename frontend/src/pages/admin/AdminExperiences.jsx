import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function AdminExperiences() {
  const experiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      difficulty: "Medium",
    },
    {
      id: 2,
      company: "Amazon",
      role: "SDE Intern",
      difficulty: "Hard",
    },
    {
      id: 3,
      company: "Deloitte",
      role: "Analyst",
      difficulty: "Easy",
    },
  ];

  const handleDelete = (id) => {
    alert("Experience deleted (placeholder): " + id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Interview Experiences
      </Typography>

      {experiences.map((exp) => (
        <Card key={exp.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{exp.company}</Typography>
            <Typography>Role: {exp.role}</Typography>
            <Typography>Difficulty: {exp.difficulty}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => handleDelete(exp.id)}
            >
              Delete Experience
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
