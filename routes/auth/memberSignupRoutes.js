const express = require('express');
const router = express.Router();
const memberRegistration = require('../../controllers/auth/memberSignupController');
const { registerSchema, loginSchema, passwordUpdateSchema } = require('../../validators/validations');
const validate = require('../../middlewares/validate')


router.post('/auth/register-member', validate(registerSchema), memberRegistration);

module.exports = router;