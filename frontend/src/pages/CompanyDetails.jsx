import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config.js";

export default function CompanyDetails() {
  const { companySlug } = useParams();
  const [company, setCompany] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/companies/${companySlug}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);

        fetch(`${API_BASE_URL}/api/experiences/company/${data.id}`)
          .then((res) => res.json())
          .then((exp) => setExperiences(exp));
      });
  }, [companySlug]);

  if (!company) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f7f9fc" }}>
      
      {/* HEADER BOX */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Avatar
            src={company.logo}
            sx={{ width: 90, height: 90, border: "3px solid #1976D2" }}
          />

          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1565C0" }}>
              {company.name}
            </Typography>

            <Typography sx={{ color: "#555", mt: 1 }}>
              {company.description || "Explore interview experiences, roles and difficulty insights."}
            </Typography>
          </Box>
        </Card>
      </motion.div>

      {/* EXPERIENCES */}
      <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold", color: "#1976D2" }}>
        Interview Experiences
      </Typography>

      <Divider sx={{ mb: 3, mt: 1 }} />

      {experiences.length === 0 && (
        <Typography sx={{ color: "#777" }}>No experiences added yet.</Typography>
      )}

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              "&:hover": {
                boxShadow: "0 10px 28px rgba(21,101,192,0.25)",
                transform: "scale(1.01)",
                transition: "0.3s"
              }
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                Role: {exp.job_role}
              </Typography>

              <Typography sx={{ color: "#555" }}>
                Difficulty: {exp.difficulty}
              </Typography>

              <Typography sx={{ mt: 1, color: "#333" }}>
                {exp.experience_text}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
}
