// router.fetchUsers = async () => {
//     const sql = 'SELECT * FROM Users';
//     const [results, metadata] = await sequelize.query(sql);
//     console.log(results); 
// }

// router.fetchUsers = async (status) => {
     
//     const teamData = await sequelize.query(sql, options);
//     console.log(teamData); 
 
// }

// router.fetchUserById = async (userId) => {
//     const sql = 'SELECT * FROM Users WHERE id = :id';
//     const [results] = await sequelize.query(sql, {
//         replacements: { id: userId },
//         type: Sequelize.QueryTypes.SELECT,
//     });
//     console.log(results);
// }

// router.updateUserEmail = async (userId, newEmail) => {
//     const sql = 'UPDATE Users SET email = :email WHERE id = :id';
//     const [results] = await sequelize.query(sql, {
//         replacements: { email: newEmail, id: userId },
//         type: Sequelize.QueryTypes.UPDATE,
//     });
//     console.log('Rows updated:', results);
// }

// router.deleteUser = async (userId) => {
//     const sql = 'DELETE FROM Users WHERE id = :id';
//     const results = await sequelize.query(sql, {
//         replacements: { id: userId },
//         type: Sequelize.QueryTypes.DELETE,
//     });
//     console.log('Rows deleted:');
// }
// router.countUser = async () => {
//     const sql = 'SELECT COUNT(*) AS userCount FROM Users';
//     const [results] = await sequelize.query(sql, {
//         type: Sequelize.QueryTypes.SELECT,
//     });
//     console.log(results); // [{ userCount: 42 }] 
// }

// router.fetchUsersTransaction = async() => {
//     const transaction = await sequelize.transaction();

//     try {
//         const sql = 'SELECT * FROM Users';
//         const [results] = await sequelize.query(sql, { transaction });
//         console.log(results);
//         await transaction.commit();
//     } catch (error) {
//         await transaction.rollback();
//         console.error(error);
//     }
// }

