import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();

  const companies = [
    { name: "Google", slug: "google" },
    { name: "Amazon", slug: "amazon" },
    { name: "Microsoft", slug: "microsoft" },
    { name: "Deloitte", slug: "deloitte" },
    { name: "Accenture", slug: "accenture" },
    { name: "Meta", slug: "meta" },
  ];

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
    </Box>
  );
}
