const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/tokenAuthMiddleware');
const isAdmin = require('../../middlewares/roleMiddleware');
const getProtectedMemberDetails = require('../../controllers/admin/getMemberController')
const createNewUserWithDetails = require('../../controllers/admin/createMemberController')
const getMembershipDetails = require('../../controllers/admin/adminController')


// Chain middlewares - authMiddleware first, then isAdmin
router.post('/create-memberDetails', authMiddleware, isAdmin, createNewUserWithDetails);  // for creating related model details about the member by authorized admin only
router.get('/admin-data', authMiddleware, isAdmin, getMembershipDetails.getAdminDetails);
router.get('/all/:id', authMiddleware, getProtectedMemberDetails.getUserData);
router.get('/all/paid/:status', authMiddleware, getProtectedMemberDetails.getUsersWithPendingStatus);  // req.params.status = Paid
router.get('/membership', authMiddleware, getMembershipDetails.getMembershipDetails);
router.get('/team/:name', authMiddleware, getMembershipDetails.getTeamWithTeammates);   // req.params.name = Knights, Bishops, 
router.get('/all/unpaid/:status', authMiddleware, getProtectedMemberDetails.getUsersWithStatusActive);  // req.params.status = Pending
router.get('/team-rank/:rank', authMiddleware, getMembershipDetails.getTeamWithAboveRank);   // req.params.rank = 500 - 2500


module.exports = router;