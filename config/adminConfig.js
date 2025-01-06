require('dotenv').config();

module.exports = {
  // Store this securely in environment variables
  ADMIN_REGISTRATION_CODE: process.env.ADMIN_REGISTRATION_CODE,
  // Initial admin email - use this to create the first admin account
  INITIAL_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL
};

