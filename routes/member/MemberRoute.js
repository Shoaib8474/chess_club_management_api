const express = require('express');
const router = express.Router();
const authMiddleware  = require('../../middlewares/tokenAuthMiddleware');
const {getAuthMemberDetails, updateName, updatePassword, deleteMember} = require('../../controllers/member/memberController');


router.get('/member-details',authMiddleware, getAuthMemberDetails);
router.put('/update-name', authMiddleware, updateName);
router.put('/update-password', authMiddleware, updatePassword);
router.delete('/delete-member', authMiddleware, deleteMember);

module.exports = router;
