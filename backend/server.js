import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./config/db.js";
import { initializeDatabase } from "./config/dbexe.js";

//routes
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
import db from "./config/db.js";



const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//initialize DB 
initializeDatabase();

//testing route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

//api route
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
app.use((req, res, next) => {
  req.db = db;
  next();
});
// start server
const PORT = process.env.PORT || 56882;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
