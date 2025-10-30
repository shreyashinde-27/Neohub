import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [centerInfo, setCenterInfo] = useState<string>(
    "📍 NeoHub Service Center, Solapur, Maharashtra, India"
  );

  useEffect(() => {
    // Load selected branch info if available
    const branch = localStorage.getItem("selectedBranch");
    if (branch) {
      setCenterInfo(`📍 NeoHub Service Center, ${branch}, Maharashtra, India`);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-8">
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1043/1043253.png"
        alt="NeoHub Logo"
        className="w-28 h-28 mb-6 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h2
        className="text-5xl font-bold mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Welcome to NeoHub
      </motion.h2>

      <motion.p
        className="text-lg text-green-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Your Trusted Service Partner
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          "https://cdn-icons-png.flaticon.com/512/751/751463.png",
          "https://cdn-icons-png.flaticon.com/512/3014/3014736.png",
          "https://cdn-icons-png.flaticon.com/512/1055/1055686.png",
          "https://cdn-icons-png.flaticon.com/512/3076/3076935.png",
        ].map((icon, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.2 }}
          >
            <img src={icon} alt="Service" className="w-16 h-16 mb-2" />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="max-w-xl text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        NeoHub connects you with skilled professionals for all your household
        and business needs.
      </motion.p>

      <motion.p
        className="text-gray-400 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {centerInfo}
      </motion.p>

      {/* User chooses when to move forward */}
      <motion.button
        onClick={() => {
          if (isAuthenticated()) {
            navigate("/service-centers"); // logged-in user → branch selection
          } else {
            navigate("/auth"); // new user → login/register
          }
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        Get Started
      </motion.button>

      <motion.footer
        className="mt-12 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        📞 {import.meta.env.VITE_CONTACT_NUMBER || "+91 98765 43210"} | ✉{" "}
        {import.meta.env.VITE_CONTACT_EMAIL || "servicecenter@neohub.com"}
      </motion.footer>
    </section>
  );
};

export default Welcome;
