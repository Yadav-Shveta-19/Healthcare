const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");
const DoctorProfile = require("../models/DoctorProfile");

const createDoctor = async (doctorData) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      fullName,
      email,
      phone,
      specialization,
      experience,
      consultationFee,
      workingHours,
      slotDuration,
    } = doctorData;

    // Check duplicate email
    const existingDoctor = await User.findOne({
  email: email.toLowerCase().trim(),
});

    if (existingDoctor) {
      throw new Error("Doctor already exists with this email.");
    }

    // Generate temporary password
    const tempPassword = "Dr@" + uuidv4().substring(0, 8);

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create doctor user
    const doctorUser = await User.create(
      [
        {
          fullName,
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          phone,
          role: "doctor",
        },
      ],
      { session }
    );

    // Create doctor profile
    await DoctorProfile.create(
      [
        {
          user: doctorUser[0]._id,
          specialization,
          experience,
          consultationFee,
          workingHours,
          slotDuration,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      message: "Doctor created successfully.",
      temporaryPassword: tempPassword,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const getAllDoctors = async () => {
  const doctors = await DoctorProfile.find()
    .populate({
      path: "user",
      select: "-password",
    });

  return doctors;
};
const updateDoctor = async (doctorId, updateData) => {
  const doctor = await DoctorProfile.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor Profile Not Found");
  }

  doctor.specialization =
    updateData.specialization || doctor.specialization;

  doctor.experience =
    updateData.experience ?? doctor.experience;

  doctor.consultationFee =
    updateData.consultationFee ?? doctor.consultationFee;

  doctor.workingHours =
    updateData.workingHours || doctor.workingHours;

  doctor.slotDuration =
    updateData.slotDuration ?? doctor.slotDuration;

  await doctor.save();

  return doctor;
};
const addLeaveDay = async (doctorId, leaveDate) => {

    const doctor = await DoctorProfile.findById(doctorId);

    if (!doctor) {
        throw new Error("Doctor Not Found");
    }

    doctor.leaveDays.push(leaveDate);

    await doctor.save();

    return doctor;
};
module.exports = {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  addLeaveDay,
};