# Backend Setup Instructions

1. Create a PostgreSQL database:
   - Name: homeservices
   - User: postgres
   - Password: Shreya2705

2. Run this SQL command to create the required tables:
-------------------------------------------------------
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price INTEGER
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  contact_number VARCHAR(15),
  booking_date DATE,
  service_name VARCHAR(100),
  payment_method VARCHAR(50)
);
-------------------------------------------------------

3. Install backend dependencies:
   npm install express pg cors body-parser

4. Start the backend server:
   node index.js

5. Backend will be available at:
   http://localhost:5000/api/bookings

   Example routes:
   - POST /api/bookings → for booking submission
   - GET /api/bookings/services → fetch all available services

   # Update: Improved project description on 30 Oct 2025

