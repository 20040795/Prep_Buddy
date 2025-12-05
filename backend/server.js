import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./config/db.js";
import { initializeDatabase } from "./config/dbexe.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/auth", authRoutes);
