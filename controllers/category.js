const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Category.remove(req.params.id);
        res.status(200).json({
            message: 'Позиция удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
        }).save();
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};