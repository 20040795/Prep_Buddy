import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddExperience() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    company_id: "",
    job_role: "",
    difficulty: "",
    experience_text: "",
    questions: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Experience added successfully!");
        navigate(`/companies/${companies.find(c => c.id == formData.company_id).slug}`);
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Add Interview Experience</Typography>

      <TextField
        select
        label="Select Company"
        name="company_id"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.company_id}
        onChange={handleChange}
      >
        {companies.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Job Role"
        name="job_role"
        sx={{ mt: 2 }}
        value={formData.job_role}
        onChange={handleChange}
      />

      <TextField
        select
        fullWidth
        label="Difficulty"
        name="difficulty"
        sx={{ mt: 2 }}
        value={formData.difficulty}
        onChange={handleChange}
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
      </TextField>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Experience Text"
        name="experience_text"
        sx={{ mt: 2 }}
        value={formData.experience_text}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Questions Asked"
        name="questions"
        sx={{ mt: 2 }}
        value={formData.questions}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={!formData.company_id}
      >
        Submit Experience
      </Button>
    </Box>
  );
}
