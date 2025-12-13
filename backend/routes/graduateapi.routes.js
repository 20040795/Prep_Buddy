import express from "express";
import { getGraduateAPI } from "../controllers/graduateAPIController.js";

const router = express.Router();

router.get("/live", getGraduateAPI);

export default router;
