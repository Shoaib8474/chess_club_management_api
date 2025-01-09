const express = require("express");
const router = express.Router();
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

const getMembershipDetails = {
    getAdminDetails: async (req, res, next) => {
        try {
            const admin = await User.findAll({
                where: {
                    role: "admin",
                },
            });

            //    Raw SQL queries
            // const sql = `SELECT * FROM Users WHERE role = 'admin'`
            // const options = {
            //     type: sequelize.QueryTypes.SELECT
            // };
            // const admin = await sequelize.query(sql, options);
            // console.log(admin);

            // if (!admin) {
            //     return res.status(404).json({
            //         message: "admin not found",
            //     });
            // }

            res.status(200).json(admin);
        } catch (err) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },

    getMembershipDetails: async (req, res) => {
        try {
            //   console.log("Request Body: ", req.user)
            const memberships = await Membership.findAll({
                include: [{
                    model: User,
                    attributes: ["email"],
                }, ],
            });

            // Raw SQL queries
            // const sql = `
            // SELECT memberships.*, users.email
            // FROM memberships
            // LEFT JOIN users ON memberships.userId = users.id`;

            // const options = {
            //     type: sequelize.QueryTypes.SELECT
            // };
            // const userData = await sequelize.query(sql, options);
            // console.log(userData);

            res.json(memberships);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    },

    getMemberhsipWithStatus: async (req, res) => {
        try {
            const {
                status
            } = req.params;

            // Fetch Teams and its associated tables
            const MembershipData = await Membership.findAll({
                attributes: ["id", "startDate", "endDate", "status"],
                where: {
                    status: {
                        [Op.like]: `%${status}%`,
                    },
                },
                include: [{
                    model: User,
                    attributes: ["id", "name", "email"],
                    include: [{
                        model: Team,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }, ],
                }, ],
                //  raw: true,
                required: true,
            });

            // Raw SQL queries
            // const sql = `
            // SELECT
            //     m.id, m.startDate, m.endDate, m.status,
            //     u.id as user_id, u.name, u.email,
            //     t.name as team_name
            // FROM memberships m
            // INNER JOIN users u ON m.userId = u.id
            // LEFT JOIN userteams ut ON u.id = ut.userId
            // LEFT JOIN teams t ON ut.teamId = t.id
            // WHERE m.status LIKE :status`;

            // const options = {
            //     replacements: { status: `%${status}%` },
            //     type: sequelize.QueryTypes.SELECT
            // };

            // const MembershipData = await sequelize.query(sql, options);
            // console.log(MembershipData);

            if (!MembershipData) {
                console.log("Not found");
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(200).json(teamName);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },

    getTeamWithTeammates: async (req, res) => {
        try {
            const {
                name
            } = req.params;
            console.log(name);

            // Fetch Team and its associated tables
            const teamData = await Team.findAll({
                where: {
                    name: name,
                },
                include: [{
                        model: User,
                        required: true,
                        through: {
                            attributes: [],
                        },
                    },
                    {
                        model: Rank,
                        attributes: ["score"],
                    },
                ],
                //  raw: true,
                //  required: false,
            });

            // Raw SQL queries
            // const sql = `
            // SELECT
            //     teams.*,
            //     users.*,
            //     ranks.score
            // FROM teams
            // INNER JOIN userteams ON teams.id = userteams.teamId
            // INNER JOIN users ON userteams.userId = users.id
            // LEFT JOIN ranks ON teams.id = ranks.teamId
            // WHERE teams.name = :name`;

            // const options = {
            //     replacements: { name },
            //     type: sequelize.QueryTypes.SELECT
            // };

            // const teamData = await sequelize.query(sql, options);

            if (!name) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(200).json(teamData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },

    getTeamWithAboveRank: async (req, res) => {
        try {
            const {
                rank
            } = req.params;
            console.log(rank);

            // Fetch Team and its associated tables
            const teamData = await Team.findAll({
                include: [{
                        model: Rank,
                        attributes: ["score"],
                        where: {
                            score: {
                                [Op.gt]: rank,
                            },
                        },
                    },
                    {
                        model: User,
                        required: true,
                        through: {
                            attributes: [],
                        },
                    },
                ],
                //  raw: true,
                //  required: false,
            });

            // Raw SQL queries
            // const sql = `
            // SELECT
            //     teams.*,
            //     ranks.score,
            //     users.*
            // FROM teams
            // INNER JOIN ranks ON teams.id = ranks.teamId
            // INNER JOIN userteams ON teams.id = userteams.teamId
            // INNER JOIN users ON userteams.userId = users.id
            // WHERE ranks.score > :rank`;

            // const options = {
            //     replacements: { rank },
            //     type: sequelize.QueryTypes.SELECT
            // };

            // const teamData = await sequelize.query(sql, options);

            if (!teamData) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.status(200).json(teamData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },
};

// getTeamDetails.getTeamWithAboveRank().then((result) => {
//     console.log(JSON.stringify(result, null, 2));
// });
// getMembershipDetails.getMemberhsipWithStatus().then((result) => {
//     console.log(JSON.stringify(result, null, 2));
// });

module.exports = getMembershipDetails;