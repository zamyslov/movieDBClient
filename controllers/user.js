const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');

module.exports.getAll = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: 'Пользователь удален'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const user = await new User({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            isAdmin: req.body.isAdmin,
        }).save();
        res.status(201).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login});
    let newPassword = req.body.password;
    if (candidate) {
        const passwordResult = bcrypt.compareSync(newPassword, candidate.password);
        if (!passwordResult) {
            const salt = bcrypt.genSaltSync(10);
            newPassword = bcrypt.hashSync(newPassword, salt);
        }
    }
    const updated = {
        login: req.body.login,
        password: newPassword,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
    };
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(201).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};
