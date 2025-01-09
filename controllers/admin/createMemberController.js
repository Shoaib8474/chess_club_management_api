// const sequelize = require('../../config/database');
const {
    sequelize,
    User,
    Membership,
    Payment,
    Team,
    Rank
} = require('../../models');


const createNewUserWithDetails = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            userData,
            membershipData,
            paymentData,
            teamName,
            rankData
        } = req.body
        // console.log("Score:", rankData.score)

        // Check if user already exists
        const user = await User.findOne({
            where: {
                email: userData.email
            },
            transaction
        });

        // Create Membership
        await user.createMembership(membershipData, {
            transaction
        });

        // Create Payment
        await user.createPayment(paymentData, {
            transaction
        });

        // Find or Create Team
        const [team] = await Team.findOrCreate({
            where: {
                name: teamName
            },
            transaction
        });

        // Associate User with Team
        await user.addTeam(team, {
            transaction
        });

        // Create Rank if not exist
        const rank = Rank.findOne({
            where: {
                teamId: team.id
            }
        })
        if (!rank) {
            await Rank.create({
                ...rankData,
                teamId: team.id
            }, {
                transaction
            });
        }

        // Commit Transaction
        await transaction.commit();
        console.log('User and related data created successfully!');
        res.json({
            success: true,
            message: 'User and related data created successfully!'
        })
    } catch (error) {
        await transaction.rollback();
        console.error('Error creating user and related data:', error);
    }
};


// createNewUserWithDetails(
//     { email: 'bob@example.com' },
//     { startDate: '2025-02-25', endDate: '2025-04-30', status: 'Paid'},
//     { amount: 100, paymentDate: '2025-02-25' },
//     'Knights',
//     { score: 0 }
// );


module.exports = createNewUserWithDetails;