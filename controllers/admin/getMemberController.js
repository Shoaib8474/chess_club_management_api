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