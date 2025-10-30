import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Shreya2705",
  database: process.env.DB_NAME || "mydb",
  port: process.env.DB_PORT || 5432,
});

// Test the connection once when the app starts
pool.query("SELECT NOW()")
  .then(res => console.log("✅ PostgreSQL connected at", res.rows[0].now))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

export default pool;
