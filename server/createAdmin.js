require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./src/models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@healthcare.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullName: "System Admin",
      email: "admin@healthcare.com",
      password: hashedPassword,
      role: "admin",
      phone: "9999999999",
      isVerified: true,
    });

    console.log("🎉 Admin Created Successfully");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();