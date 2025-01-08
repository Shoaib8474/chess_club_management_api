const {
    Op
} = require("sequelize");
const {
    sequelize,
    User,
    Membership,
    Payment,
    Team,
    Rank,
} = require("../../models");

const getProtectedMemberDetails = {
    getUserData: async (req, res) => {
        try {
            const userId = req.params.id;

            // Fetch User and its associated tables
            const userData = await User.findByPk(userId, {
                include: [{
                        model: Membership,
                        attributes: ["startDate", "endDate", "status"],
                    },
                    {
                        model: Payment,
                        attributes: ["amount", "paymentDate"],
                    },
                    {
                        model: Team,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        },
                        include: [{
                            model: Rank,
                            attributes: ["score"],
                        }, ],
                    },
                ],
                //  raw: true,
            });

        //     const sql = `
        //     SELECT users.*, 
        //         memberships.startDate, memberships.endDate, memberships.status,
        //         payments.amount, payments.paymentDate,
        //         teams.name as team_name,
        //         ranks.score
        //    FROM users
        //  LEFT JOIN memberships ON users.id = memberships.userId
        //  LEFT JOIN payments ON users.id = payments.userId
        //  LEFT JOIN userteams ON users.id = userteams.userId
        //  LEFT JOIN teams ON userteams.teamId = teams.id
        //  LEFT JOIN ranks ON teams.id = ranks.teamId
        //  WHERE users.id = :userId`;
            
        //     const options = {
        //         replacements: { userId },
        //         type: sequelize.QueryTypes.SELECT
        //     };
            
        //     const userData = await sequelize.query(sql, options);
        //     console.log(userData); 

            if (!userData) {
                console.log("Not found");
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },

    getUsersWithPendingStatus: async (req, res) => {
        try {
            const {
                status
            } = req.params;

            // Fetch Team and its associated tables
            const userData = await User.findAll({
                attributes: ["name", "email"],
                include: [{
                    model: Membership,
                    // attributes: [""],
                    where: {
                        status: {
                            [Op.like]: `%${status}%`,
                        },
                    },
                }, ],
                //  raw: true,
                //  required: false,
            });

            if (!userData) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // console.log(JSON.stringify(userData, null, 2))
            res.status(200).json(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },

    //
    getUsersWithStatusActive: async (req, res) => {
        try {
            const {
                status
            } = req.params;
            // console.log("Status: ", status)

            // Fetch Team and its associated tables
            const userData = await User.findAll({
                attributes: ["name", "email"],
                include: [{
                    model: Membership,
                    // attributes: [""],
                    where: {
                        status: {
                            [Op.like]: `%${status}%`,
                        },
                    },
                }, ],
                //  raw: true,
                //  required: false,     
            });
    
    //  const sql = `SELECT users.name, users.email 
    //  FROM users
    //  INNER JOIN memberships ON users.id = memberships.userId
    //  WHERE memberships.status LIKE :status`;
     
    //  const options = {
    //    replacements: { status: `%${status}%` },
    //    type: sequelize.QueryTypes.SELECT
    //  };
    //  const userData = await sequelize.query(sql, options);
    //  console.log(userData); 

            if (!userData) {
                return res.status(404).json({
                    message: "User not found"
                });
                console.log("Not found");
            }

            // console.log(JSON.stringify(userData, null, 2))
            res.status(200).json(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internalx Server Error"
            });
        }
    },
};

// getMemberDetails.getUsersWithStatusActive().then(result => { console.log(JSON.stringify(result, null, 2))});

module.exports = getProtectedMemberDetails;