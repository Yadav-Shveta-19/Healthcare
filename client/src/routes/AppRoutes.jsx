import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PatientDashboard from "../pages/patient/Dashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import DoctorDashboard from "../pages/doctor/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route
  path="/patient/book/:doctorId"
  element={<BookAppointment />}
/>
<Route path="/doctor" element={<DoctorDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;