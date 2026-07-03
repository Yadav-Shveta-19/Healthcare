const {
  getDoctorAppointments,
  completeAppointment,
} = require("../services/doctorService");

const getDoctorAppointmentsController = async (req, res) => {
  try {
    const appointments = await getDoctorAppointments(req.user._id);

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const completeAppointmentController = async (req, res) => {
  try {
    const appointment = await completeAppointment(
      req.params.id,
      req.body.doctorNotes,
      req.body.prescription
    );

    res.status(200).json({
      success: true,
      message: "Appointment Completed Successfully",
      appointment,
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDoctorAppointmentsController,
  completeAppointmentController,
};