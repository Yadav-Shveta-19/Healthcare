const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    workingHours: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },

    slotDuration: {
      type: Number,
      default: 30,
    },

    leaveDays: [
      {
        type: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);