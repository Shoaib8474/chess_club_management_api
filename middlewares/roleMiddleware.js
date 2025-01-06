require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    User
} = require('../models');


// admin verification middleware
const isAdmin = async (req, res, next) => {
    try {
        // Get latest user data from database
        const user = await User.findOne({
            where: {
                id: req.decodedToken.id,
                role: 'admin' // check role in database
            },
            attributes: ['id', 'role', 'email', 'lastLogout'] 
        });

        if (!user) {
            return res.status(403).json({
                message: 'Admin access required'
            });
        }
        console.log(user.lastLogout)
        
        // Check if token was issued before last logout
        if (user.lastLogout && new Date(user.lastLogout) > new Date(req.decodedToken.iat * 1000)) {
            return res.status(401).json({
                message: 'Token invalidated by logout'
            });
        }

        // Add fresh user data to request
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Server error during admin verification'
        });
    }
};


module.exports = isAdmin;