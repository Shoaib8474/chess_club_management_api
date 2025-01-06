const express = require('express');
const router = express.Router();
const adminRegistration = require('../../controllers/auth/adminSignupController');
const { authMiddleware } = require('../../middlewares/tokenAuthMiddleware');
const { loginSchema, adminRegisterSchema} = require('../../validators/validations')
const validate = require('../../middlewares/validate')



router.post('/auth/register-admin', validate(adminRegisterSchema),  adminRegistration);

module.exports = router