const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    aiPreVisitSummary: {
      urgencyLevel: {
        type: String,
        enum: ["Low", "Medium", "High"],
      },
      chiefComplaint: String,
      suggestedQuestions: [String],
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    prescription: {
      type: String,
      default: "",
    },

    aiPostVisitSummary: {
      type: String,
      default: "",
    },

    calendarEventId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Completed",
        "Cancelled",
        "Rescheduled"
      ],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);