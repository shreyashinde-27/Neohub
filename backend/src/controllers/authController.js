import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail, createUser } from "../models/UserModel.js";

dotenv.config();

// ---------------------
// REGISTER USER
// ---------------------
export const registerUser = async (req, res) => {
  const { name, email, password, contact } = req.body;

  console.log("📩 Register request:", req.body);

  if (!name || !email || !password || !contact) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword, contact); // ✅ now includes contact
    console.log("✅ New user created:", user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------------
// LOGIN USER
// ---------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Login request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
