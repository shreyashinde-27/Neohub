// src/index.js
//Middleware part of the project 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/services.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import cors from "cors";

// put this BEFORE app.use('/api/...') routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Home Services API is running 🚀");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
