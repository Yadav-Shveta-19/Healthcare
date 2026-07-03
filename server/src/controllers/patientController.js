const {
  searchDoctors,
  getAvailableSlots,
  bookAppointment,
  getDoctors,
  getPatientAppointments,
} = require("../services/patientService");
const searchDoctorsController = async (req, res) => {
  try {
    const doctors = await searchDoctors(req.query.specialization);

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
const getAvailableSlotsController = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "doctorId and date are required",
      });
    }

    const result = await getAvailableSlots(doctorId, date);

    res.status(200).json({
      success: true,
      leave: result.leave,
      slots: result.slots,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    const appointment = await bookAppointment({
      patientId: req.user._id,
      doctorProfileId: req.body.doctorProfileId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      symptoms: req.body.symptoms,
    });

    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
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
const getDoctorsController = async (req, res) => {
  try {
    const doctors = await getDoctors();

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getPatientAppointmentsController = async (req, res) => {
  try {
    const appointments = await getPatientAppointments(req.user._id);

    res.status(200).json({
      success: true,
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
module.exports = {
  searchDoctorsController,
  getAvailableSlotsController,
  bookAppointmentController,
  getDoctorsController,
   getPatientAppointmentsController,
};