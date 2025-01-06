const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

// Rank Model
const Rank = sequelize.define('Rank', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    score: { type: DataTypes.FLOAT, allowNull: false },
}, {
    timestamps: true,
});

module.exports = Rank;