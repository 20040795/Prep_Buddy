import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddExperience() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [companies, setCompanies] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [newCompanyName, setNewCompanyName] = useState("");

  const [formData, setFormData] = useState({
    company_id: "",
    job_role: "",
    difficulty: "",
    experience_text: "",
    questions: "",
  });

  // Load existing companies
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD NEW COMPANY
  const handleAddCompany = () => {
    fetch(`${API_BASE_URL}/api/companies/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCompanyName })
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Company added!");

        // Refresh companies
        fetch(`${API_BASE_URL}/api/companies`)
          .then((res) => res.json())
          .then((list) => {
            setCompanies(list);

            // Auto-select the newly added company
            setFormData((prev) => ({
              ...prev,
              company_id: data.id
            }));

            setOpenAddDialog(false);
            setNewCompanyName("");
          });
      })
      .catch(() => alert("Error adding company"));
  };

  const handleSubmit = () => {
    fetch(`${API_BASE_URL}/api/experiences`, {
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
        navigate(
          `/companies/${companies.find((c) => c.id == formData.company_id)?.slug}`
        );
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Add Interview Experience</Typography>

      {/* Company dropdown */}
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

        {/* ADD NEW COMPANY OPTION */}
        <MenuItem
          value="add_new"
          sx={{ color: "blue", fontWeight: "bold" }}
          onClick={() => setOpenAddDialog(true)}
        >
          ➕ Add New Company
        </MenuItem>
      </TextField>

      {/* OTHER FORM FIELDS */}
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
        disabled={!formData.company_id || formData.company_id === "add_new"}
      >
        Submit Experience
      </Button>

      {/* ADD COMPANY POPUP */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Company Name"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddCompany}
            variant="contained"
            disabled={!newCompanyName}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
