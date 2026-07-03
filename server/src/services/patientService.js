const generateSlots = require("../utils/generateSlots");
const DoctorProfile = require("../models/DoctorProfile");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

const { sendAppointmentConfirmation } = require("./emailService");

const {
  generatePreVisitSummary,
} = require("./geminiService");

// ===============================
// Search Doctors
// ===============================
const searchDoctors = async (specialization) => {
  let query = {};

  if (specialization) {
    query.specialization = {
      $regex: specialization,
      $options: "i",
    };
  }

  const doctors = await DoctorProfile.find(query).populate({
    path: "user",
    select: "fullName email phone",
  });

  return doctors;
};

// ===============================
// Get All Doctors (For Patient Dashboard)
// ===============================
const getDoctors = async () => {
  return await DoctorProfile.find().populate(
    "user",
    "fullName email phone role"
  );
};

// ===============================
// Get Available Slots
// ===============================
const getAvailableSlots = async (doctorId, date) => {
  const doctor = await DoctorProfile.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Check leave day
  const requestedDate = new Date(date).toDateString();

  const isLeave = doctor.leaveDays.some(
    (leave) => new Date(leave).toDateString() === requestedDate
  );

  if (isLeave) {
    return {
      leave: true,
      slots: [],
    };
  }

  // Generate all slots
  const allSlots = generateSlots(
    doctor.workingHours.start,
    doctor.workingHours.end,
    doctor.slotDuration
  );

  // Fetch booked appointments
  const appointments = await Appointment.find({
    doctor: doctor.user,
    appointmentDate: new Date(date),
    status: { $ne: "Cancelled" },
  });

  const bookedSlots = appointments.map(
    (appointment) => appointment.appointmentTime
  );

  // Remove booked slots
  const availableSlots = allSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return {
    leave: false,
    slots: availableSlots,
  };
};

// ===============================
// Book Appointment
// ===============================
const bookAppointment = async ({
  patientId,
  doctorProfileId,
  appointmentDate,
  appointmentTime,
  symptoms,
}) => {

  // Find doctor's profile
  const doctorProfile = await DoctorProfile.findById(doctorProfileId);

  if (!doctorProfile) {
    throw new Error("Doctor not found");
  }

  // Check leave day
  const isLeave = doctorProfile.leaveDays.some(
    (leave) =>
      new Date(leave).toDateString() ===
      new Date(appointmentDate).toDateString()
  );

  if (isLeave) {
    throw new Error("Doctor is on leave");
  }

  // Check if slot already booked
  const existingAppointment = await Appointment.findOne({
    doctor: doctorProfile.user,
    appointmentDate: new Date(appointmentDate),
    appointmentTime,
    status: "Scheduled",
  });

  if (existingAppointment) {
    throw new Error("Slot already booked");
  }

  // Generate AI Summary
  const aiSummary = await generatePreVisitSummary(symptoms);

  // Create appointment
  const appointment = await Appointment.create({
    patient: patientId,
    doctor: doctorProfile.user,
    appointmentDate,
    appointmentTime,
    symptoms,
    aiPreVisitSummary: aiSummary,
  });

  // Fetch patient & doctor
  const patient = await User.findById(patientId);
  const doctor = await User.findById(doctorProfile.user);

  // Send confirmation email
  await sendAppointmentConfirmation(
    patient.email,
    patient.fullName,
    doctor.fullName,
    appointmentDate,
    appointmentTime
  );

  return appointment;
};
const getPatientAppointments = async (patientId) => {
  return await Appointment.find({
    patient: patientId,
  })
    .populate("doctor", "fullName email")
    .sort({ appointmentDate: -1 });
};
module.exports = {
  searchDoctors,
  getDoctors,
  getAvailableSlots,
  bookAppointment,
   getPatientAppointments,
};