import pool from "../config/db.js";

export const getBookingsByUser = async (userId) => {
  const result = await pool.query("SELECT * FROM bookings WHERE user_id = $1", [userId]);
  return result.rows;
};

export const createBooking = async (userId, serviceId, date, paymentMethod) => {
  const result = await pool.query(
    "INSERT INTO bookings (user_id, service_id, date, payment_method) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, serviceId, date, paymentMethod]
  );
  return result.rows[0];
};
