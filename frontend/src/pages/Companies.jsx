import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.log("Error loading companies:", err));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>

      {companies.map((company) => (
        <Box key={company.slug} mt={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/companies/${company.slug}`)}
          >
            {company.name}
          </Button>
        </Box>
      ))}

      {companies.length === 0 && (
        <Typography sx={{ mt: 3 }}>No companies found.</Typography>
      )}
    </Box>
  );
}
