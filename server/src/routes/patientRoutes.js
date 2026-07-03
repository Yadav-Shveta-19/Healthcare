const express = require("express");
const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  searchDoctorsController,
  getAvailableSlotsController,
  bookAppointmentController,
  getDoctorsController,
  getPatientAppointmentsController,
} = require("../controllers/patientController");

// Get all doctors
router.get(
  "/doctors",
  protect,
  authorize("patient"),
  getDoctorsController
);

// Search doctors (optional)
router.get(
  "/search-doctors",
  protect,
  authorize("patient"),
  searchDoctorsController
);

// Get available slots
router.get(
  "/slots",
  protect,
  authorize("patient"),
  getAvailableSlotsController
);

// Book appointment
router.post(
  "/appointment",
  protect,
  authorize("patient"),
  bookAppointmentController
);
router.get(
  "/appointments",
  protect,
  authorize("patient"),
  getPatientAppointmentsController
);
module.exports = router;