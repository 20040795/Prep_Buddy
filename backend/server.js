import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // MUST be first

import db from "./config/db.js";
import { initializeDatabase } from "./config/dbexe.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companies.routes.js";
import experienceRoutes from "./routes/experiences.routes.js";
import codingRoutes from "./routes/coding.routes.js";
import forumRoutes from "./routes/forum.routes.js";
import graduateRoutes from "./routes/graduates.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import graduateAPIRoutes from "./routes/graduateapi.routes.js";
import logoRoutes from "./routes/logo.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

// middleware
app.use(cors({ origin: '*' })); 
app.use(express.json());

// initialize DB tables
initializeDatabase();

// test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/graduates", graduateRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/graduateapi", graduateAPIRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/logo", logoRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
console.log("ENV CHECK:");
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("PASS:", process.env.DB_PASS);


