AI Powered Healthcare Management System
📌 Overview

it is a full-stack AI-powered Healthcare Management System that enables patients to book appointments with doctors, allows doctors to manage consultations, and leverages AI to generate medical summaries for improved healthcare efficiency.

The system provides secure authentication, appointment scheduling, AI-assisted summaries, email notifications, and role-based dashboards.

🚀 Features
👤 Authentication
Secure User Registration
Secure Login using JWT Authentication
Role-Based Access Control
Patient
Doctor
Admin (Backend Ready)
🩺 Patient Module
View Available Doctors
Search Doctors
View Doctor Details
Check Available Time Slots
Book Appointment
Receive Appointment Confirmation Email
AI Generated Pre-Visit Summary
👨‍⚕️ Doctor Module
Doctor Dashboard
View Scheduled Appointments
Add Doctor Notes
Add Prescription
Mark Appointment as Completed
AI Generated Post-Visit Summary
🤖 AI Features

Google Gemini AI is integrated to provide:

Pre-Visit Summary
Chief Complaint
Urgency Level
Suggested Questions
Post-Visit Summary
Visit Summary
Treatment Summary
Follow-up Recommendations
📧 Email Notifications

Automatic appointment confirmation emails are sent to patients after successful booking using Nodemailer.

🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Tailwind CSS
React Toastify
Vite
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT (JSON Web Token)
bcrypt.js
AI
Google Gemini API
Email Service
Nodemailer
Gmail App Password
📂 Project Structure
Healthcare/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── components/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── config/
│
└── README.md
🔐 Authentication Flow
User registers
Password is securely hashed
User logs in
JWT Token generated
Token stored on client
Protected routes verified using middleware
📅 Appointment Workflow
Patient logs in.
Patient selects a doctor.
Available slots are displayed.
Patient books an appointment.
AI generates a Pre-Visit Summary.
Confirmation email is sent.
Doctor views the appointment.
Doctor adds notes and prescription.
AI generates a Post-Visit Summary.
Appointment is marked as completed.
⚙️ Installation
Clone Repository
git clone <repository-url>
Backend
cd server
npm install
npm start
Frontend
cd client
npm install
npm run dev
🔑 Environment Variables

Create a .env file inside the server folder.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

GEMINI_API_KEY=your_google_gemini_api_key
📈 Future Enhancements
Video Consultation
Online Payment Integration
Medical Report Upload
Patient Appointment History
Admin Dashboard UI
SMS Notifications
Doctor Ratings & Reviews
AI Disease Prediction
Electronic Health Records (EHR)
Multi-language Support
👩‍💻 Developed By

Shveta Yadav

B.Tech Computer Science Student
