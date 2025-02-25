const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");
const {
    User,
    Membership,
    Team,
    Rank
} = require("../../models");

const getAuthMemberDetails = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        console.log(req.body.email);
        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                email,
            },
            include: [{
                    model: Membership,
                },
                {
                    model: Team,
                    through: {
                        attributes: [],
                    },
                    include: {
                        model: Rank,
                    },
                },
            ],
        });

        // Raw Sql queries
        //         const sql = `
        // SELECT
        //     users.*,
        //     memberships.*,
        //     teams.*,
        //     ranks.*
        // FROM users
        // LEFT JOIN memberships ON users.id = memberships.userId
        // LEFT JOIN userteams ON users.id = userteams.userId
        // LEFT JOIN teams ON userteams.teamId = teams.id
        // LEFT JOIN ranks ON teams.id = ranks.teamId
        // WHERE users.email = :email
        // LIMIT 1`;

        // const options = {
        //     replacements: { email },
        //     type: sequelize.QueryTypes.SELECT
        // };

        // const existingUser = await sequelize.query(sql, options);

        if (!existingUser) {
            return res.status(400).json({
                message: "Member email_id is not registered",
            });
        }

        res.status(201).json({
            message: "Request successfull",
            member: existingUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update member's name
const updateName = async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const {
            decodedToken
        } = req;

        const existingUser = await User.findOne({
            where: {
                id: decodedToken.id,
            },
        });
        if (!existingUser) {
            return res.status(400).json({
                message: "Did not find any user",
            });
        }

        await User.update({
            name,
        }, {
            where: {
                id: decodedToken.id,
            },
        });

        //RaW sql Queries
        //  const sql = `
        // UPDATE users
        // SET name = :name
        // WHERE id = :id`;

        // const options = {
        //     replacements: {
        //         name: name,
        //         id: decodedToken.id
        //     },
        //     type: sequelize.QueryTypes.UPDATE
        // };

        //const result = await sequelize.query(sql, options);
        // console.log(result)

        res.json({
            message: "Name updated successfully",
            data: {
                name,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating name",
            error: error.message,
        });
    }
};
// Update member's name
const deleteMember = async (req, res) => {
    try {
        const {
            password
        } = req.body;
        const {
            decodedToken
        } = req;

        const user = await User.findByPk(req.decodedToken.id);

        if (!user) {
            return res.status(400).json({
                message: "Did not find any user",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        await user.destroy();

        //Raw Sql queries
        // const sql = `DELETE FROM users WHERE id = :id`;

        // const options = {
        //     replacements: { id: req.decodedToken.id },
        //     type: sequelize.QueryTypes.DELETE
        // };

        // await sequelize.query(sql, options);

        res.json({
            message: "Member Deleted successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting",
            error: error.message,
        });
    }
};

// Update member's password
const updatePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Current password, new password, and confirmation are required",
            });
        }

        // passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirmation do not match",
            });
        }

        // verify current password
        const user = await User.findByPk(req.decodedToken.id);
        const validPassword = await bcrypt.compare(currentPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.update({
            password: hashedPassword,
        }, {
            where: {
                id: req.decodedToken.id,
            },
        });

        // RaW sql Queries
        //  const sql = `
        // UPDATE users
        // SET password = :password
        // WHERE id = :id`;

        // const options = {
        //     replacements: {
        //         password: hashedPassword,
        //         id: decodedToken.id
        //     },
        //     type: sequelize.QueryTypes.UPDATE
        // };

        //const result = await sequelize.query(sql, options);
        // console.log(result)

        res.json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating password",
            error: error.message,
        });
    }
};

module.exports = {
    getAuthMemberDetails,
    updateName,
    updatePassword,
    deleteMember,
};