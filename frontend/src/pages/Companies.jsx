import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config.js";

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.log("Error loading companies:", err));
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f4f7fc" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#1565C0"
        }}
      >
        Explore Companies 🔍
      </Typography>

      <Typography sx={{ mb: 4, color: "#444" }}>
        Discover hiring trends, interview experiences, and job roles from top tech companies.
      </Typography>

      <Grid container spacing={3}>
        {companies.map((company, index) => (
          <Grid key={company.slug} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  p: 2,
                  textAlign: "center",
                  background: "#fff",
                  cursor: "pointer",
                  "&:hover": {
                    background: "linear-gradient(135deg,#E3F2FD,#FFFFFF)",
                    boxShadow: "0 10px 28px rgba(21,101,192,0.25)"
                  }
                }}
                onClick={() => navigate(`/companies/${company.slug}`)}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "#E3F2FD",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  src={company.logo}
                  alt={company.name}
                  imgProps={{
                    style: {
                      objectFit: "contain",
                      padding: "8px"
                    }
                  }}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#0D47A1", mb: 1 }}
                  >
                    {company.name}
                  </Typography>

                  <Typography sx={{ color: "#555", fontSize: "0.9rem", minHeight: 40 }}>
                    {company.description || "Click to view interview insights"}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#1565C0",
                      "&:hover": { backgroundColor: "#0D47A1" }
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {companies.length === 0 && (
        <Typography sx={{ mt: 3, color: "#777" }}>No companies found.</Typography>
      )}
    </Box>
  );
}
