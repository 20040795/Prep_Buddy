import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
}));

const Card = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  padding: theme.spacing(5),
  background: theme.palette.background.paper,
  boxShadow: "0 8px 35px rgba(0,0,0,0.4)",
  textAlign: "center",
}));

export default function Register() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  return (
    <Wrapper>

      <Card>
        <img
          src="/dbs.png"
          alt="DBS Logo"
          style={{ width: 90, marginBottom: 20, borderRadius: 8 }}
        />

        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          Register
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, py: 1.3, fontWeight: 600 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography
          sx={{ mt: 2, cursor: "pointer" }}
          color="secondary"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </Typography>
      </Card>

    </Wrapper>
  );
}
