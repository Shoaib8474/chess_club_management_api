const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

// Membership Model
const Membership = sequelize.define('Membership', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }, 
}, {
    timestamps: true,
});


module.exports = Membership;