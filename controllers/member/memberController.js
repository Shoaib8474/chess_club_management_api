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
            name
        }, {
            where: {
                id: decodedToken.id
            }
        });

        res.json({
            message: "Name updated successfully",
            data: {
                name
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
            password: hashedPassword
        }, {
            where: {
                id: req.decodedToken.id
            }
        });

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