import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// testing the route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});
import db from "./config/db.js";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
