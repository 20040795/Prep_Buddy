import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

export default function CodingPractice() {
  const categories = [
    { name: "Arrays", link: "https://leetcode.com/tag/array/" },
    { name: "Strings", link: "https://leetcode.com/tag/string/" },
    { name: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/" },
    { name: "SQL", link: "https://www.hackerrank.com/domains/sql" },
    { name: "Aptitude", link: "https://www.indiabix.com/aptitude/questions-and-answers/" },
  ];

  const topQuestions = [
    "Reverse a Linked List",
    "Find second largest element in array",
    "Check if a string is palindrome",
    "Merge two sorted arrays",
    "Find missing number in array",
    "Reverse words in a string",
    "Longest common prefix",
    "Two-sum problem",
  ];

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
                  onClick={() => window.open(cat.link, "_blank")}
                >
                  Practice
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#003366" }}>
        💡 Most Asked Coding Questions in DBS Interviews
      </Typography>

      <Box sx={{ ml: 2 }}>
        {topQuestions.map((q, i) => (
          <Typography key={i} sx={{ mb: 1 }}>
            • {q}
          </Typography>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 5, mb: 2, fontWeight: "bold", color: "#003366" }}>
        External Coding Practice Resources
      </Typography>

      <Grid container spacing={3}>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: "#ffa116", ":hover": { bgcolor: "#e68a00" }, width: 200, height: 50 }}
            onClick={() => window.open("https://leetcode.com", "_blank")}
          >
            LeetCode
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: "#2ec866", ":hover": { bgcolor: "#1da754" }, width: 200, height: 50 }}
            onClick={() => window.open("https://www.hackerrank.com", "_blank")}
          >
            HackerRank
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: "#0b6ab0", ":hover": { bgcolor: "#084f7a" }, width: 200, height: 50 }}
            onClick={() => window.open("https://www.geeksforgeeks.org", "_blank")}
          >
            GeeksForGeeks
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
