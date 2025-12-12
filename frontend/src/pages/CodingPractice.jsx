import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

export default function CodingPractice() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const categories = [
    { name: "Arrays", link: "https://leetcode.com/tag/array/" },
    { name: "Strings", link: "https://leetcode.com/tag/string/" },
    { name: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/" },
    { name: "SQL", link: "https://www.hackerrank.com/domains/sql" },
    { name: "Aptitude", link: "https://www.indiabix.com/aptitude/questions-and-answers/" },
  ];

  const handlePracticeClick = (topicLink) => {
    // ⭐ Update leaderboard
    fetch("http://localhost:5000/api/leaderboard/solved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id })
    });

    // Open practice link
    window.open(topicLink, "_blank");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#003366", fontWeight: "bold" }}>
        Coding Practice
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#003366" }}>
        Categories
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {categories.map((cat) => (
          <Grid item key={cat.name}>
            <Card sx={{ width: 260, height: 150, textAlign: "center", boxShadow: 3, borderRadius: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  {cat.name}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ bgcolor: "#003366" }}
                  onClick={() => handlePracticeClick(cat.link)}
                >
                  Practice
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
