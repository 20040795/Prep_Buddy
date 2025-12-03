import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  width: "100%",
  maxWidth: 420,
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
}));

export default function Login() {
  const theme = useTheme();

  return (
    <Background>
      <LoginCard elevation={0}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="/dbs.png"
            alt="DBS Logo"
            style={{ width: 90, height: 90, borderRadius: "8px" }}
          />
        </Box>

        <Typography variant="h4" align="center" gutterBottom color="primary">
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="filled"
          InputProps={{
            style: { backgroundColor: theme.palette.background.paper, borderRadius: 4 }
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="filled"
          InputProps={{
            style: { backgroundColor: theme.palette.background.paper, borderRadius: 4 }
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mt: 3,
            py: 1.4,
            fontWeight: 600,
            borderRadius: 3,
            textTransform: "none"
          }}
        >
          Login
        </Button>
      </LoginCard>
    </Background>
  );
}
