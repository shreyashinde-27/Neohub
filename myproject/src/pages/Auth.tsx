// src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface User {
  name: string;
  email: string;
  password: string;
  contact?: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ helper functions for localStorage
  const getRegisteredUsers = (): User[] => {
    const stored = localStorage.getItem("registeredUsers");
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUser = (user: User) => {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getRegisteredUsers();

    if (isLogin) {
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        // ✅ login successful
        localStorage.setItem("authToken", "sample-token");
        navigate("/service-centers");
      } else {
        alert("Email not registered or password incorrect. Redirecting to registration...");
        setIsLogin(false); // open registration page
      }
    } else {
      const emailExists = users.some((u) => u.email === formData.email);
      if (emailExists) {
        alert("Email already registered. Please login.");
        setIsLogin(true);
        return;
      }

      saveRegisteredUser(formData); // store new user
      alert("Registration successful! Please login now.");
      setFormData({ name: "", email: "", password: "", contact: "" });
      setIsLogin(true); // switch to login page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 overflow-hidden relative">
      {/* Animated background circles */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full opacity-20 top-10 left-1/4"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 bottom-10 right-1/3"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {isLogin ? "Login" : "Register"}
      </motion.h2>

      {/* Toggle buttons */}
      <motion.div className="flex gap-4 mb-6 z-10">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 rounded-full font-semibold ${
            isLogin ? "bg-green-500 text-black" : "bg-gray-700 text-white"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 rounded-full font-semibold ${
            !isLogin ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
          }`}
        >
          Register
        </button>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md z-10 bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
          required
        />

        {!isLogin && (
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
            required
          />
        )}

        <button
          type="submit"
          className={`mt-4 px-6 py-3 rounded-full font-semibold text-lg ${
            isLogin ? "bg-green-500 text-black" : "bg-blue-500 text-white"
          } hover:opacity-90 transition`}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </motion.form>
    </div>
  );
}
