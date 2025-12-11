import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddExperience() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [questions, setQuestions] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.log("Error loading companies:", err));
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to submit experience.");
      return;
    }

    const payload = {
      company_id: companyId,
      job_role: role,
      difficulty,
      experience_text: experienceText,
      questions,
    };

    try {
      const res = await fetch("http://localhost:5000/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Experience submitted successfully!");
        navigate("/dashboard");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Interview Experience
      </Typography>

      <Box mt={2}>
        <TextField
          select
          fullWidth
          label="Select Company"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          {companies.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          label="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          select
          fullWidth
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Experience Details"
          value={experienceText}
          onChange={(e) => setExperienceText(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Questions Asked (comma separated)"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Submit Experience
      </Button>
    </Box>
  );
}
