import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function GraduatePrograms() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/graduates")
      .then((res) => res.json())
      .then((data) => setPrograms(data));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Graduate Programs</Typography>

      {programs.map((p) => (
        <Card key={p.id} sx={{ mt: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.company}</Typography>
            <Typography>Deadline: {p.deadline}</Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => window.open(p.link, "_blank")}
            >
              Apply
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
