const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');


const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('admin', 'member'),
        defaultValue: 'member'
      },
    lastLogout: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  }
);

module.exports = User;


// // Add to User model: Track last logout time
// const addLastLogoutToUser = (sequelize) => {
//   const User = sequelize.models.User;
//   User.addColumn('lastLogout', {
//     type: DataTypes.DATE,
//     allowNull: true
//   });
// };

