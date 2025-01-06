const sequelize = require('../../config/database');
const { User } = require('../../models');


const memberRegistration =  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body.email);
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Create new member (default role is 'member')
      const user = await User.create({
        name,
        email,
        password,
      });
  
      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  
module.exports = memberRegistration;