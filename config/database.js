const Sequelize = require('sequelize');

const sequelize = new Sequelize('club_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
