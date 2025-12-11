import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const experiences = [
    { id: 1, title: "Google Interview - Software Intern" },
    { id: 2, title: "Amazon Coding Round Experience" },
  ];

  const forumPosts = [
    { id: 1, title: "How to prepare for DBS coding round?" },
    { id: 2, title: "What topics to study for Deloitte exam?" },
  ];
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Card sx={{ p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Name: {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Role: {user.role}</Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Interview Experiences
      </Typography>

      {experiences.map((exp) => (
        <Card key={exp.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography>{exp.title}</Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        My Forum Questions
      </Typography>

      {forumPosts.map((post) => (
        <Card key={post.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography>{post.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
