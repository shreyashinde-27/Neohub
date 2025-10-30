import pool from "../config/db.js"; // direct DB connection

// 📌 Fetch bookings (optionally by user contact)
export const fetchBookings = async (req, res) => {
  try {
    const { contact } = req.query;
    let result;

    if (contact) {
      result = await pool.query(
        "SELECT * FROM bookings WHERE contact = $1 ORDER BY created_at DESC",
        [contact.trim()]
      );
    } else {
      result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    }

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
      error: err.message,
    });
  }
};

// 📌 Make a booking
export const makeBooking = async (req, res) => {
  try {
    const { name, contact, service, date, time, payment_method } = req.body;

    if (!name || !contact || !service || !date || !time || !payment_method) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, contact, service, date, time, payment_method) are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO bookings (name, contact, service, date, time, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name.trim(), contact.trim(), service.trim(), date, time, payment_method.trim()]
    );

    res.status(201).json({
      success: true,
      message: "✅ Booking created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error making booking:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating booking",
      error: err.message,
    });
  }
};
