import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "#003366" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          DBS Interview Portal
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/companies">Companies</Button>
        <Button color="inherit" component={Link} to="/coding">Coding</Button>
        <Button color="inherit" component={Link} to="/forum">Forum</Button>
        <Button color="inherit" component={Link} to="/graduates">Graduates</Button>
        <Button 
          variant="outlined" 
          sx={{ ml: 2, borderColor: "white", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
