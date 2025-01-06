const express = require('express');
const router = express.Router();
const authMiddleware  = require('../../middlewares/tokenAuthMiddleware');
const {getAuthMemberDetails, updateName, updatePassword, deleteMember} = require('../../controllers/member/memberController');


router.get('/member/profile',authMiddleware, getAuthMemberDetails);
router.put('/member/update-name', authMiddleware, updateName);
router.put('/member/update-password', authMiddleware, updatePassword);
router.delete('/member/delete', authMiddleware, deleteMember);

module.exports = router;
