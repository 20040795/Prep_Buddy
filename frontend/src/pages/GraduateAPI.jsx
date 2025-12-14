import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function GraduateAPI() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/graduateapi/live`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log("Graduate jobs error:", err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1565C0" }}>
        Graduate Programs – Live Jobs
      </Typography>

      {jobs.length === 0 && (
        <Typography>No jobs found. Try refreshing.</Typography>
      )}

      {jobs.map((job, i) => (
        <Card key={i} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">{job.title}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>{job.company}</Typography>
            <Typography sx={{ color: "gray" }}>{job.location}</Typography>

            {job.salary && (
              <Typography sx={{ color: "green", mt: 1 }}>
                Salary: {job.salary}
              </Typography>
            )}

            <Typography sx={{ mt: 1 }}>
              {job.snippet?.substring(0, 200)}...
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 1, backgroundColor: "#003366" }}
              onClick={() => window.open(job.link, "_blank")}
            >
              Apply
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
