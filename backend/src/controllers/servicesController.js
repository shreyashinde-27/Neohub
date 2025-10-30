import { getAllServices, addService } from "../models/ServiceModel.js";

export const fetchServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = await addService(name, description, price);
    res.status(201).json(newService);
  } catch (err) {
    console.error("Error adding service:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
