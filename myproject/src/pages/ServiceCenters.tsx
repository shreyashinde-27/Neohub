// src/pages/ServiceCenters.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const branches = [
  { 
    slug: "solapur", 
    label: "Solapur",
    img: "https://t4.ftcdn.net/jpg/04/89/27/85/360_F_489278582_9i13nA8xtBo7BUetByGM4WNYiPPIvUYE.jpg" 
  },
  { 
    slug: "pune", 
    label: "Pune",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPzdYgLQ7lfbqowwP-sOSEw7F5or1fRdX2Q&s" 
  },
  { 
    slug: "madha", 
    label: "Madha",
    img: "https://content.jdmagicbox.com/comp/pune/v4/020pxx20.xx20.170904165337.y1v4/catalogue/home-seva-kothrud-pune-plumbing-contractors-3tt1quxjur.jpg"
  },
  {
    slug: "sangli", 
    label: "Sangli",
    img: "https://img.freepik.com/premium-vector/cleaning-service-business-logo-design-eco-friendly-concept-interior-home-building_1249511-445.jpg"
  },
] as const;

const ServiceCenters: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8 relative overflow-hidden">
      {/* Background animation circles */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full opacity-20 top-0 left-1/4"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 bottom-0 right-1/3"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Service Center
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, staggerChildren: 0.2 }}
      >
        {branches.map(({ slug, label, img }) => (
          <motion.button
            key={slug}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.setItem("selectedCenter", slug);
              navigate(`/service-centers/${slug}`);
            }}
            className="flex flex-col items-center bg-gray-800 rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-transform duration-300"
          >
            {/* Image */}
            <img
              src={img}
              alt={label}
              className="w-full h-48 object-cover"
            />

            {/* Label below image */}
            <div className="py-4 text-2xl font-semibold text-white bg-gray-900 w-full text-center">
              {label}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default ServiceCenters;
