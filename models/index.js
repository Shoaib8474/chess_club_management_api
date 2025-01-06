// importing all the Models
const User = require('./user');
const Membership = require('./membership');
const Payment = require('./payment');
const Team = require('./team');
const Rank = require('./rank');
const sequelize = require('../config/database');



User.hasOne(Membership, { foreignKey: 'userId', onDelete: 'CASCADE' });
Membership.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Payment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Team, { through: 'UserTeams', foreignKey: 'userId' });
Team.belongsToMany(User, { through: 'UserTeams', foreignKey: 'teamId' });

Team.hasOne(Rank, { foreignKey: 'teamId', onDelete: 'CASCADE' });
Rank.belongsTo(Team, { foreignKey: 'teamId' });


module.exports = {User, Membership, Payment, Team, Rank, sequelize }