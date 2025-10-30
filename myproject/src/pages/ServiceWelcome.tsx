// src/pages/ServiceWelcome.tsx
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const serviceCenterInfo = {
  solapur: {
    name: "Solapur",
    address: "123 Solapur Main Road",
    contact: "9876543210",
    owner: "Mr. Sharma",
    email: "solapur@neohub.com",
    logo:
      "https://static.vecteezy.com/system/resources/previews/068/499/307/non_2x/home-repair-web-style-graphic-badge-vector.jpg",
  },
  pune: {
    name: "Pune",
    address: "456 Pune Industrial Area",
    contact: "9123456780",
    owner: "Ms. Desai",
    email: "pune@neohub.com",
    logo:
      "https://image.shutterstock.com/image-vector/home-service-logo-260nw-739720219.jpg",
  },
  madha: {
    name: "Madha",
    address: "789 Madha Central Market",
    contact: "9988776655",
    owner: "Mr. Shinde",
    email: "madha@neohub.com",
    logo:
      "https://static.vecteezy.com/system/resources/previews/007/117/231/non_2x/home-repair-service-group-of-construction-engineers-with-building-equipment-tools-work-at-house-repairing-carpenter-repairman-builder-master-renovation-apartment-cartoon-flat-illustration-vector.jpg",
  },
  sangli: {
    name: "Sangli",
    address: "321 Sangli East Street",
    contact: "9001122334",
    owner: "Mrs. Patil",
    email: "sangli@neohub.com",
    logo:
      "https://png.pngtree.com/png-clipart/20230512/original/pngtree-home-service-logo-png-image_9159027.png",
  },
} as const;

type BranchSlug = keyof typeof serviceCenterInfo;

const ServiceWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { branch } = useParams<{ branch: string }>();

  const slug = (branch || "").toLowerCase() as BranchSlug;
  const info = serviceCenterInfo[slug];

  if (!info) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-xl">⚠️ Branch not found</p>
          <button
            onClick={() => navigate("/service-centers")}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Back to Service Centers
          </button>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    // save selected branch
    localStorage.setItem("selectedCenter", info.name);
    // go to services page next
    navigate("/services");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <motion.img
        src={info.logo}
        alt={`${info.name} logo`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="w-24 h-24 mb-4 rounded-full object-cover shadow-lg border-2 border-green-400"
      />

      <motion.h1
        className="text-4xl font-extrabold mb-2 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to {info.name} Service Center
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-6 text-center max-w-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Providing reliable home services with care and professionalism.
      </motion.p>

      <motion.div
        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-left space-y-2 border border-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>
          <strong>📍 Address:</strong> {info.address}
        </p>
        <p>
          <strong>📞 Contact:</strong> {info.contact}
        </p>
        <p>
          <strong>👤 Owner:</strong> {info.owner}
        </p>
        <p>
          <strong>📧 Email:</strong> {info.email}
        </p>
      </motion.div>

      <motion.button
        onClick={handleProceed}
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full shadow-lg transition transform hover:scale-105"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Proceed to Services
      </motion.button>
    </div>
  );
};

export default ServiceWelcome;
