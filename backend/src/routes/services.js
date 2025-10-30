import express from "express";
import { fetchServices, createService } from "../controllers/servicesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", fetchServices);
router.post("/", authMiddleware, createService);

export default router;
