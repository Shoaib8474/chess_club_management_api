const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/tokenAuthMiddleware');
const isAdmin = require('../../middlewares/roleMiddleware');
const getProtectedMemberDetails = require('../../controllers/admin/getMemberController')
const createNewUserWithDetails = require('../../controllers/admin/createMemberController')
const getMembershipDetails = require('../../controllers/admin/adminController')
// const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models/index')


// Chain middlewares - authMiddleware first, then isAdmin
router.get('/admin', authMiddleware, isAdmin, getMembershipDetails.getAdminDetails);
router.post('/admin/member/fill-related-details ', authMiddleware, isAdmin, createNewUserWithDetails);  // for creating related model details about the member by authorized admin only
router.get('/admin/member/:id', authMiddleware, getProtectedMemberDetails.getUserData);
router.get('/admin/member/:status', authMiddleware, getProtectedMemberDetails.getUsersWithPendingStatus);  // req.params.status = Paid
router.get('/admin/member/membership', authMiddleware, getMembershipDetails.getMembershipDetails);
router.get('/admin/member/team/:name', authMiddleware, getMembershipDetails.getTeamWithTeammates);   // req.params.name = Knights, Bishops, 
router.get('/admin/member/:status', authMiddleware, getProtectedMemberDetails.getUsersWithStatusActive);  // req.params.status = Pending
router.get('/admin/member/team-rank/:rank', authMiddleware, getMembershipDetails.getTeamWithAboveRank);   // req.params.rank = 500 - 2500



module.exports = router;