require('dotenv').config();
const express = require("express");
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler')
const memberRegistration = require('./routes/auth/memberSignupRoutes')
const adminRegistration = require('./routes/auth/adminSignupRoutes')
const login = require('./routes/auth/loginRoutes')
const createNewUserWithDetails = require('./routes/member/MemberRoute')
const protectedMemberDetails = require('./routes/admin/adminRoutes')


const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection failed:", error));

// Sync databasee
sequelize.sync().then(() => console.log("Database synced"));

app.use('/api', memberRegistration);
app.use('/api', adminRegistration);
app.use('/api', login);
app.use('/api', createNewUserWithDetails);
app.use('/api', protectedMemberDetails);
console.log(protectedMemberDetails.fetchUsers("Paid"))

// Centralized error handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
