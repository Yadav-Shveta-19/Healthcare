const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getDoctorAppointmentsController,
  completeAppointmentController,
} = require("../controllers/doctorController");

// Get doctor appointments
router.get(
  "/appointments",
  protect,
  authorize("doctor"),
  getDoctorAppointmentsController
);

// Complete appointment
router.put(
  "/appointment/:id",
  protect,
  authorize("doctor"),
  completeAppointmentController
);

module.exports = router;