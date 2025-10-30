// src/models/UserModel.js
import pool from "../config/db.js";

// ---------------------
// Helpers
// ---------------------
function normalizeEmail(emailRaw) {
  return String(emailRaw || "").trim().toLowerCase();
}

function normalizeName(nameRaw) {
  return String(nameRaw || "").trim();
}

function safeUser(userRow) {
  if (!userRow) return null;
  const { password, ...user } = userRow;
  return user;
}

// ---------------------
// Queries
// ---------------------

// Find user by email
export async function findUserByEmail(emailRaw) {
  const email = normalizeEmail(emailRaw);
  try {
    const result = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error("DB Error (findUserByEmail):", err.message);
    throw err;
  }
}

// Create new user
export async function createUser(nameRaw, emailRaw, hashedPassword) {
  const name = normalizeName(nameRaw);
  const email = normalizeEmail(emailRaw);

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    console.error("DB Error (createUser):", err.message);
    throw err;
  }
}

// Find user by ID
export async function findUserById(id) {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );
    return safeUser(result.rows[0]);
  } catch (err) {
    console.error("DB Error (findUserById):", err.message);
    throw err;
  }
}

// Update password (force reset or migration)
export async function updateUserPassword(userId, newHashedPassword) {
  try {
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      newHashedPassword,
      userId,
    ]);
  } catch (err) {
    console.error("DB Error (updateUserPassword):", err.message);
    throw err;
  }
}

// Delete user (optional helper)
export async function deleteUserById(userId) {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  } catch (err) {
    console.error("DB Error (deleteUserById):", err.message);
    throw err;
  }
}
