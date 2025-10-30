import { Router } from "express";
const router = Router();
import { query } from "../db";

// Book a service
router.post("/", async (req, res) => {
  const { name, contact_number, booking_date, service_name, payment_method } = req.body;

  try {
    const result = await query(
      "INSERT INTO bookings (name, contact_number, booking_date, service_name, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, contact_number, booking_date, service_name, payment_method]
    );
    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (err) {
    console.error("Error inserting booking:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// Get all services (optional route if frontend needs to display service list)
router.get("/services", async (req, res) => {
  try {
    const result = await query("SELECT * FROM services");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

export default router;
