const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const keys = require('../config/keys');

const errorHandler = require('../untils/errorHandler');

module.exports.login = async function (req, res) {
    /**
     * @body email
     * @body password
     */
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        const passwordCheckResult = bcrypt.compareSync(
            req.body.password,
            candidate.password
        );

        if (passwordCheckResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, { expiresIn: 60*60 });

            res.status(200).json({
                email: candidate.email,
                token: `Bearer ${ token }`,
            })
        } else {
            res.status(401).json({
                message: "Incorrect email or password",
            })
        }

    } else {
        res.status(404).json({
            message: "User is not found",
        });
    }
}

module.exports.register = async function (req, res) {
    /**
     * @body email
     * @body password
     */

    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        res.status(409).json({
            message: "A user with this email has already been created",
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
            errorHandler(res, e);
        }
    }
}
