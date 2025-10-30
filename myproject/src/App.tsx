import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import ServiceCenters from "./pages/ServiceCenters";
import Services from "./pages/Services";
import Confirmation from "./pages/Confirmation";
import ServiceWelcome from "./pages/ServiceWelcome";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/service-centers" element={<ServiceCenters />} />
      <Route path="/service-centers/:branch" element={<ServiceWelcome />} />
      <Route path="/services" element={<Services />} />

      {/* Protected pages */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
