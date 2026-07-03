const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    medicines: [
      {
        medicineName: {
          type: String,
          required: true,
        },

        dosage: {
          type: String,
          required: true,
        },

        frequency: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },
      },
    ],

    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);