import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const serviceCenterInfo = {
  Solapur: {
    address: "123 Solapur Main Road",
    contact: "9876543210",
    owner: "Mr. Sharma",
    email: "solapur@neohub.com",
  },
  Pune: {
    address: "456 Pune Industrial Area",
    contact: "9123456780",
    owner: "Ms. Desai",
    email: "pune@neohub.com",
  },
  Madha: {
    address: "789 Madha Central Market",
    contact: "9988776655",
    owner: "Mr. Shinde",
    email: "madha@neohub.com",
  },
  Sangli: {
    address: "321 Sangli East Street",
    contact: "9001122334",
    owner: "Mrs. Patil",
    email: "sangli@neohub.com",
  },
};

const BranchWelcome = () => {
  const { branch } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const info = serviceCenterInfo[branch as keyof typeof serviceCenterInfo];

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // check login
    setIsLoggedIn(!!token);
  }, []);

  const handleContinue = () => {
    if (branch) {
      localStorage.setItem("selectedBranch", branch); // store branch
    }
    navigate("/servicecenters"); // go to service centers
  };

  if (!info) {
    return (
      <div className="text-center text-white bg-gray-900 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">Branch not found 😢</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to {branch} Branch</h1>
      <div className="bg-green-700 p-6 rounded-xl shadow-lg max-w-md w-full text-left">
        <p className="mb-2"><strong>📍 Address:</strong> {info.address}</p>
        <p className="mb-2"><strong>📧 Email:</strong> {info.email}</p>
        <p className="mb-2"><strong>📞 Helpline:</strong> {info.contact}</p>
        <p className="mb-4"><strong>👤 Owner:</strong> {info.owner}</p>

        {isLoggedIn ? (
          <button
            onClick={handleContinue}
            className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition-all"
          >
            Continue to Services
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition-all"
          >
            Login / Signup to Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default BranchWelcome;
