import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";

export default function GraduatePrograms() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/graduateapi/live`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  useEffect(() => {
    let updated = [...jobs];

    if (search) {
      updated = updated.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      updated = updated.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minSalary) {
      updated = updated.filter((job) => {
        if (!job.salary) return false;
        const numeric = parseInt(job.salary.replace(/[^0-9]/g, ""));
        return numeric >= parseInt(minSalary);
      });
    }

    setFilteredJobs(updated);
  }, [search, location, minSalary, jobs]);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f7f9fc" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1565C0" }}>
        Graduate Programs – Ireland
      </Typography>

      <Typography sx={{ mb: 3, color: "#444" }}>
        Search and apply for top graduate opportunities powered by our live job feed.
      </Typography>

      {/* FILTERS */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
          background: "#fff",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Filter by Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Ireland">Ireland</MenuItem>
              <MenuItem value="Dublin">Dublin</MenuItem>
              <MenuItem value="Cork">Cork</MenuItem>
              <MenuItem value="Galway">Galway</MenuItem>
              <MenuItem value="Limerick">Limerick</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              type="number"
              fullWidth
              label="Minimum Salary (€)"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
          </Grid>
        </Grid>
      </Card>

      {/* JOB LIST */}
      {filteredJobs.length === 0 ? (
        <Typography>No graduate jobs found.</Typography>
      ) : (
        filteredJobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                background: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                "&:hover": {
                  background: "linear-gradient(135deg,#E3F2FD,#FFFFFF)",
                  boxShadow: "0 10px 28px rgba(21,101,192,0.25)",
                  transition: "0.3s"
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                  {job.title}
                </Typography>

                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  {job.company}
                </Typography>

                <Typography sx={{ color: "gray" }}>
                  {job.location}
                </Typography>

                {job.salary && (
                  <Typography sx={{ mt: 1, color: "green" }}>
                    Salary: {job.salary}
                  </Typography>
                )}

                <Typography sx={{ mt: 1, color: "#444" }}>
                  {job.snippet?.slice(0, 200)}...
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "#1565C0" }}
                  onClick={() => window.open(job.link, "_blank")}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </Box>
  );
}
