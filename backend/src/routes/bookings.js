import express from "express";
import pool from "../config/db.js"; // PostgreSQL connection

const router = express.Router();

// 📌 Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, contact, service, date, time, payment_method } = req.body;

    // ✅ Validate
    if (!name || !contact || !service || !date || !time || !payment_method) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Insert into DB
    const result = await pool.query(
      `INSERT INTO bookings (name, contact, service, date, time, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, contact, service, date, time, payment_method`,
      [name.trim(), contact.trim(), service.trim(), date, time, payment_method.trim()]
    );

    res.status(201).json({
      success: true,
      message: "✅ Booking successful",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Booking error:", error.message);
    res.status(500).json({ error: "Server error while creating booking" });
  }
});

// 📌 Get all bookings OR filter by contact
router.get("/", async (req, res) => {
  try {
    const { contact } = req.query;
    let result;

    if (contact) {
      result = await pool.query(
        "SELECT * FROM bookings WHERE contact = $1 ORDER BY id DESC",
        [contact.trim()]
      );
    } else {
      result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    }

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
});

export default router;
