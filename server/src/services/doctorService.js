const Appointment = require("../models/Appointment");
const { generatePostVisitSummary } = require("./geminiService");

const getDoctorAppointments = async (doctorId) => {
  const appointments = await Appointment.find({
    doctor: doctorId,
  })
    .populate("patient", "fullName email phone")
    .sort({ appointmentDate: 1, appointmentTime: 1 });

  return appointments;
};

const completeAppointment = async (
  appointmentId,
  doctorNotes,
  prescription
) => {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.doctorNotes = doctorNotes;
  appointment.prescription = prescription;

  appointment.aiPostVisitSummary = await generatePostVisitSummary(
    doctorNotes,
    prescription
  );

  appointment.status = "Completed";

  await appointment.save();

  return appointment;
};

module.exports = {
  getDoctorAppointments,
  completeAppointment,
};