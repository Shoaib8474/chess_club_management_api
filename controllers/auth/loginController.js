require('dotenv').config();
const sequelize = require('../../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');


// Login for Admin and Member
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body.email)
      const user = await User.findOne({ where: { email } });
      console.log(user.email)
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };



// Logout set timestamp
const logoutTimeUpdate = async (userId) => {
    await User.update(
      { lastLogout: new Date() },
      { where: { id: userId } }
    );
  };
  
// Logout Helper
const logoutHelper = async (req, res) => {
    try {
      await logoutTimeUpdate(req.decodedToken.id);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error during logout' });
    }
  };



module.exports = { login, logoutHelper }


  