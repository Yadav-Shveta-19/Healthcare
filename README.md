#  AI Powered Healthcare Management System

## 📖 Overview

It is a full-stack AI-powered Healthcare Management System built using the MERN Stack. It enables patients to book appointments with doctors, while doctors can manage consultations and generate AI-assisted medical summaries using Google Gemini AI.

---

## ✨ Features

### 👤 Authentication

* Secure User Registration & Login
* JWT Authentication
* Role-Based Access (Patient & Doctor)

### 🩺 Patient Module

* View Available Doctors
* Book Appointments
* View Available Time Slots
* AI Pre-Visit Summary
* Email Confirmation

### 👨‍⚕️ Doctor Module

* View Scheduled Appointments
* Add Doctor Notes
* Add Prescription
* Mark Appointment as Completed
* AI Post-Visit Summary

### 🤖 AI Integration

* Google Gemini AI
* Pre-Visit Medical Summary
* Post-Visit Consultation Summary

### 📧 Notifications

* Appointment Confirmation Email using Nodemailer

---

# 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Toastify
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt.js

### AI

* Google Gemini AI

### Email

* Nodemailer

---

# 📂 Project Structure

```text
Healthcare/
│
├── client/
│
├── server/
│
└── README.md
```

---

# ⚙️ Installation

## Backend

```bash
cd server
npm install
npm start
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# 🚀 Future Enhancements

* Admin Dashboard
* Patient Appointment History
* Video Consultation
* Payment Gateway Integration
* Medical Reports Upload
* SMS Notifications

---

# 👩‍💻 Developer

**Shveta Yadav**

B.Tech Computer Science Student

Full Stack Developer | MERN Stack | AI Enthusiast

---

⭐ If you like this project, consider giving it a star.
