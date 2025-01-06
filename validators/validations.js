const Joi = require("joi");

// Schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$")).required(),
});
// Schema for user registration
const adminRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$")).required(),
    adminCode: Joi.number().integer().min(1).max(10000).required()
});

// Schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// password updation schema
const passwordUpdateSchema = Joi.object({
  // email: Joi.string().email().required(),
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$")).required(),
  confirmPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$")).required()
});

module.exports = {
  registerSchema,
  loginSchema,
  passwordUpdateSchema,
  adminRegisterSchema
};