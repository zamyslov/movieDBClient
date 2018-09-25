const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({login: req.body.login});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(201).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: "Неправильный пароль"
            })
        }
    } else {
        res.status(401).json({
            message: "Такого логина нет"
        })
    }
};
module.exports.register = async function (req, res) {
    const candidate = await User.findOne({login: req.body.login});

    if (candidate) {
        res.status(409).json({
            message: "Такой логин уже занят"
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {

        }
    }
};