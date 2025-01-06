const { sequelize, User, Membership, Payment, Team, Rank } = require('../models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });

        // Seed Users
        const users = await User.bulkCreate([
            { name: 'Alice', email: 'alice@example.com', password: 'password123' },
            { name: 'Bob',    email: 'bob@example.com', password: 'password123' },
            { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
        ]);

        // Seed Memberships
        const memberships = await Membership.bulkCreate([
            { startDate: '2025-01-01', endDate: '2025-12-31',  status: 'Paid', userId: users[0].id },
            { startDate: '2025-02-01', endDate: '2025-02-28', status: 'Paid', userId: users[1].id },
            { startDate: '2025-02-01', endDate: '2025-02-28', status: 'Pending', userId: users[2].id },
        ]);

        // Seed Payments
        const payments = await Payment.bulkCreate([
            { amount: 100.0, paymentDate: '2025-01-01',  userId: users[0].id },
            { amount: 20.0,  paymentDate: '2025-01-15',  userId: users[2].id },
            { amount: 80.0,  paymentDate: '2025-02-01',  userId: users[1].id },
            { amount: 50.0,  paymentDate: '2025-02-14',  userId: users[2].id },
        ]);

        // Seed Teams
        const teams = await Team.bulkCreate([
            { name: 'Knights' },
            { name: 'Bishops' },
            { name: 'Queens' },
        ]);

        // Seed UserTeams (Many-to-Many)
        await teams[0].addUsers([users[2], users[0]]); 
        await teams[1].addUser(users[1]); 
        await teams[1].addUsers([users[2], users[0]]); 

        // Seed Ranks
        const ranks = await Rank.bulkCreate([
            { score: 1500, userId: users[0].id, teamId: teams[0].id },
            { score: 2000, userId: users[1].id, teamId: teams[1].id },
            { score: 1500, userId: users[2].id, teamId: teams[2].id },
        ]);

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error while seeding data:', error);
    } finally {
        await sequelize.close();
    }
};

seedData();
