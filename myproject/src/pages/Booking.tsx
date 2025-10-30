// src/pages/Booking.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Provider {
  id: number;
  name: string;
  fee: number;
  contact: string;
  experience: number;
  rating: number;
  imageUrl: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedService, setSelectedService] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
    date: "",
    time: "",
    payment_method: "", // ✅ renamed to match backend/DB
  });

  // ✅ Authentication check
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // ✅ Load selected provider and service from localStorage
  useEffect(() => {
    const storedProvider = localStorage.getItem("selectedProvider"); // updated key
    const storedService = localStorage.getItem("selectedService");
    if (storedProvider && storedService) {
      const provider: Provider = JSON.parse(storedProvider);
      setSelectedProvider(provider);
      setSelectedService(storedService);
      setFormData((prev) => ({ ...prev, service: storedService }));
    } else {
      navigate("/services"); // Redirect if nothing selected
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.service) return;

    if (bookingCount >= 10) {
      alert("Sorry, bookings are full. Please try later.");
      return;
    }

    try {
      // ✅ Ensure date is in YYYY-MM-DD format for PostgreSQL
      const formattedDate = formData.date
        ? new Date(formData.date).toISOString().split("T")[0]
        : "";

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: formattedDate,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setBookingCount((prev) => prev + 1);
        setTimeout(() => {
          navigate("/confirmation", { state: { bookingId: data.bookingId } });
        }, 2000);
      } else {
        alert(data.error || "Booking failed");
      }
    } catch (err: any) {
      alert(err.message || "Server error");
    }
  };

  if (!isLoggedIn || !selectedProvider) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-pink-100 to-yellow-100 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        {step === 1 ? (
          <>
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-6">
              Book {selectedProvider.name}
            </h2>

            <div className="text-center mb-6">
              <p>Fee: ₹{selectedProvider.fee}</p>
              <p>Experience: {selectedProvider.experience} yrs</p>
              <p>Rating: ⭐ {selectedProvider.rating}</p>
              <p>Contact: {selectedProvider.contact}</p>
            </div>

            {/* ✅ Display selected service and provider */}
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">
                Service: <span className="text-indigo-700">{selectedService}</span>
              </p>
              <p className="text-lg font-semibold">
                Provider: <span className="text-indigo-700">{selectedProvider.name}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />

              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                name="payment_method" // ✅ updated to match backend
                value={formData.payment_method}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
              >
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 animate-bounce text-green-500">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Redirecting you to confirmation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
