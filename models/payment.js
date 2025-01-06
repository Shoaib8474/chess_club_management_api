const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

// Payment Model
const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    paymentDate: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: true,
});


module.exports = Payment;