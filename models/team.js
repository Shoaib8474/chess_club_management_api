const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

// Team Model
const Team = sequelize.define('Team', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    timestamps: true,
});


module.exports = Team;