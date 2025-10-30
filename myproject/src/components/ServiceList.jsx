import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/login")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <div>
      <h2>Available Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ₹{service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
