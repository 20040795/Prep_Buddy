import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (email === "admin@dbs.com" && password === "admin123") {
      const adminUser = {
        email: email,
        role: "admin"
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "admin-token-placeholder");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>

      <Box mt={2}>
        <TextField
          fullWidth
          label="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box mt={2}>
        <TextField
          fullWidth
          type="password"
          label="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Button 
        variant="contained" 
        sx={{ mt: 3 }} 
        onClick={handleAdminLogin}
      >
        Login as Admin
      </Button>
    </Box>
  );
}
