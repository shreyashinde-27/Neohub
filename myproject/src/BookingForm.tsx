import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    service: "",
    payment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // sending exactly what backend expects
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Booking successful!");
        setFormData({ name: "", contact: "", date: "", time: "", service: "", payment: "" }); // reset form
      } else {
        alert(data.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        type="text"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        name="time"
        type="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        name="service"
        type="text"
        placeholder="Service Name"
        value={formData.service}
        onChange={handleChange}
        required
      />
      <select name="payment" value={formData.payment} onChange={handleChange} required>
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
