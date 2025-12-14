import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config.js";

export default function CodingPractice() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const categories = [
    { name: "Arrays", link: "https://leetcode.com/tag/array/" },
    { name: "Strings", link: "https://leetcode.com/tag/string/" },
    { name: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/" },
    { name: "SQL", link: "https://www.hackerrank.com/domains/sql" },
    { name: "Aptitude", link: "https://www.indiabix.com/aptitude/questions-and-answers/" },
  ];

  const companies = [
    { name: "Google", link: "https://leetcode.com/company/google/" },
    { name: "Amazon", link: "https://leetcode.com/company/amazon/" },
    { name: "Microsoft", link: "https://leetcode.com/company/microsoft/" },
    { name: "Netflix", link: "https://leetcode.com/problemset/all/?topicSlugs=netflix" },
    { name: "TCS", link: "https://prepinsta.com/tcs-coding-questions/" },
    { name: "Infosys", link: "https://prepinsta.com/infosys/coding-questions/" }
  ];

  const difficulty = ["Easy", "Medium", "Hard"];

  const handlePracticeClick = (topicLink) => {
    fetch(`${API_BASE_URL}/api/leaderboard/solved`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id })
    });
    window.open(topicLink, "_blank");
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "#f4f7fc",
        color: "#1a1a1a"
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: "#003366", fontWeight: "bold" }}>
        Coding Practice
      </Typography>

      {/* Topics */}
      <Typography variant="h5" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
        Topics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={4} key={cat.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ p: 2, borderRadius: 3, background: "#fff" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 2, color: "#1a1a1a" }}
                  >
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
            </motion.div>
          </Grid>
        ))}
      </Grid>

=

      {/* Companies */}
      <Typography variant="h5" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
        Company-specific Coding Sheets
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {companies.map((comp, index) => (
          <Grid item xs={12} sm={6} md={4} key={comp.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ p: 2, borderRadius: 3, background: "#fff" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 2, color: "#1a1a1a" }}
                  >
                    {comp.name}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#0D47A1" }}
                    onClick={() => handlePracticeClick(comp.link)}
                  >
                    View Sheet
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Daily Challenge */}
      <Typography variant="h5" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
        Daily Coding Challenge
      </Typography>

      <Card sx={{ p: 3, mb: 5, borderRadius: 3, background: "#fff" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
            Today's Challenge
          </Typography>
          <Typography sx={{ mt: 1, color: "#333" }}>
            Solve 1 Array problem and 1 String problem on LeetCode.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "#1565C0" }}
            onClick={() => window.open("https://leetcode.com/problemset/all/", "_blank")}
          >
            Start Challenge
          </Button>
        </CardContent>
      </Card>

      {/* Resources */}
      <Typography variant="h5" sx={{ mb: 2, color: "#003366", fontWeight: "bold" }}>
        Recommended Resources
      </Typography>

      <Card sx={{ p: 3, borderRadius: 3, background: "#fff" }}>
        <CardContent>
          <Typography sx={{ color: "#333" }}>• Striver’s SDE Sheet</Typography>
          <Typography sx={{ color: "#333" }}>• LeetCode Top 150</Typography>
          <Typography sx={{ color: "#333" }}>• SQL Interview Guide</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
