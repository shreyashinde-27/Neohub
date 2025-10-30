import React, { useState, useEffect } from "react";

const BookingForm: React.FC = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [services, setServices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    booking_date: "",
    service_name: "",
    payment_method: "Cash",
  });

  // Fetch services from backend
  useEffect(() => {
    fetch(`${API}/api/services`)
      .then((r) => r.json())
      .then(setServices)
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Booking successful:", data);
        alert(`Booking successful! ID: ${data.bookingId}`);
      } else {
        console.error("Booking failed:", data);
        alert("Booking failed!");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
    }
  };

  return (
    <form onSubmit={handleBookingSubmit}>
      <select name="service_name" value={formData.service_name} onChange={handleChange}>
        <option value="">Select Service</option>
        {services.map((s) => (
          <option key={s.id} value={s.name}>
            {s.name} - ₹{s.price}
          </option>
        ))}
      </select>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="contact_number" placeholder="Contact Number" onChange={handleChange} />
      <input type="date" name="booking_date" onChange={handleChange} />
      <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
      </select>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
