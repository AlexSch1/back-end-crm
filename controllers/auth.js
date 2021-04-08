const bcrypt = require('bcryptjs');

const User = require("../models/User");
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    /**
     * @body email
     * @body password
     */
}
module.exports.register = async function (req, res) {
    /**
     * @body email
     * @body password
     */

    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        res.status(409).json({
            message: "a user with this email has already been created",
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {
            await user.save();
            res.status(200).json(user);
        } catch (e) {

        }
    }
}
