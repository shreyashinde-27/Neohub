import pool from "../config/db.js";

export const getAllServices = async () => {
  const result = await pool.query("SELECT * FROM services ORDER BY id ASC");
  return result.rows;
};

export const addService = async (name, description, price) => {
  const result = await pool.query(
    "INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description, price]
  );
  return result.rows[0];
};
