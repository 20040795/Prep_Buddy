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

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
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
          Login
        </Typography>

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
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          sx={{ mt: 2, cursor: "pointer" }}
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Don’t have an account? Register
        </Typography>
      </Card>

    </Wrapper>
  );
}
