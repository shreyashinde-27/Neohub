import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface Booking {
  id?: string;
  date: string;
  time: string;
  service: string;
  paymentMethod: string;
  contact: string;
  name?: string;
}

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth");
      return;
    }

    const bookingId =
      location.state?.bookingId || localStorage.getItem("latestBookingId");

    if (!bookingId) {
      navigate("/");
      return;
    }

    localStorage.setItem("latestBookingId", bookingId);

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setBooking(data.booking);
          localStorage.setItem("latestBooking", JSON.stringify(data.booking));
        } else {
          // Fallback to stored booking if API fails
          const stored = localStorage.getItem("latestBooking");
          if (stored) setBooking(JSON.parse(stored));
          else navigate("/");
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
        const stored = localStorage.getItem("latestBooking");
        if (stored) setBooking(JSON.parse(stored));
        else navigate("/");
      }
    };

    fetchBooking();
  }, [navigate, location.state]);

  if (!booking) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Tick */}
        <motion.div
          className="w-16 h-16 mx-auto mb-5 text-green-500"
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
        >
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-green-400 mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Booking Confirmed 🎉
        </motion.h2>
        <p className="mb-6 text-gray-300">
          Thank you for booking with us! We look forward to serving you.
        </p>

        {/* Booking Details */}
        <motion.div
          className="bg-gray-700 p-4 rounded-lg text-left mb-6 space-y-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p><strong>📅 Date:</strong> {booking.date}</p>
          <p><strong>⏰ Time:</strong> {booking.time}</p>
          <p><strong>🛠 Service:</strong> {booking.service}</p>
          <p><strong>💳 Payment:</strong> {booking.paymentMethod}</p>
          <p><strong>📞 Contact:</strong> {booking.contact}</p>
          {booking.name && <p><strong>👤 Name:</strong> {booking.name}</p>}
          {booking.id && <p><strong>📌 Booking ID:</strong> {booking.id}</p>}
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Confirmation;
