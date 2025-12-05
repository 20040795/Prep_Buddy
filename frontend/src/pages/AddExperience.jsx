import { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddExperience() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [questions, setQuestions] = useState("");

  const handleSubmit = () => {
    console.log({company,role,difficulty,experienceText,questions,});

    alert("Experience submitted (placeholder)");
    navigate("/dashboard");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Interview Experience
      </Typography>

      <Box mt={2}>
        <TextField fullWidth label="Company Name" value={company} onChange={(e) => setCompany(e.target.value)}
 />
      </Box>

      <Box mt={2}>
        <TextField fullWidth label="Job Role" value={role} onChange={(e) => setRole(e.target.value)}
        />
      </Box>

      <Box mt={2}>
        <TextField select fullWidth label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
      </Box>

      <Box mt={2}>
        <TextField fullWidth multiline rows={4} label="Experience Details" value={experienceText} onChange={(e) => setExperienceText(e.target.value)}
        />
      </Box>

      <Box mt={2}>
        <TextField fullWidth multiline rows={4} label="Questions Asked (comma separated)" value={questions} onChange={(e) => setQuestions(e.target.value)}
        />
      </Box>

      <Button variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Submit Experience
      </Button>
    </Box>
  );
}
