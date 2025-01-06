// require('dotenv').config();
const sequelize = require("../../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const {
  ADMIN_REGISTRATION_CODE,
  INITIAL_ADMIN_EMAIL,
} = require("../../config/adminConfig");

// Admin registration - requires special code and can only be done by existing admins
module.exports = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;
    console.log(adminCode, ADMIN_REGISTRATION_CODE);

    // Verify admin registration code
    if (adminCode !== ADMIN_REGISTRATION_CODE) {
      return res
        .status(403)
        .json({ message: "Invalid admin registration code" });
    }

    // Check if this is the first admin or not (using initial admin email)
    const existingAdmins = await User.findOne({ where: { role: "admin" } }); //confirming

    if (existingAdmins && email !== INITIAL_ADMIN_EMAIL) {
      // For subsequent admin registrations, require authorization from existing admin
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Admin authorization required" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    }

    // Create admin account
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin registration successful",
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
