const nodemailer = require("nodemailer");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS Length:", process.env.EMAIL_PASS?.length);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAppointmentConfirmation = async (
  patientEmail,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: "Appointment Confirmation - Healthcare",
    html: `
      <h2>Appointment Confirmed ✅</h2>

      <p>Hello <b>${patientName}</b>,</p>

      <p>Your appointment has been booked successfully.</p>

      <hr>

      <p><b>Doctor:</b> ${doctorName}</p>
      <p><b>Date:</b> ${appointmentDate}</p>
      <p><b>Time:</b> ${appointmentTime}</p>

      <hr>

      <p>Thank you for choosing Healthcare.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP Server is ready");
  }
});
module.exports = {
  sendAppointmentConfirmation,
};