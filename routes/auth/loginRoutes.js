const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/tokenAuthMiddleware');
const { login } = require('../../controllers/auth/loginController');
const { loginSchema } = require('../../validators/validations')
const validate = require('../../middlewares/validate')
const {logoutHelper} = require('../../controllers/auth/loginController')

router.post('/auth/login', validate(loginSchema),  login);
router.post('/auth/logout', authMiddleware, logoutHelper)  //  Token invalidated through logout for Unauthorized ADMIN access 


module.exports = router;