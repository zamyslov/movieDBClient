const Actor = require('../models/Actor');
const errorHandler = require('../utils/errorHandler');


module.exports.getAll = async (req, res) => {
    try {
        const actor = await Actor.find();
        res.status(200).json(actor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        res.status(200).json(actor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Actor.remove(req.params.id);
        res.status(200).json({
            message: 'Позиция удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const actor = await new Actor({
            name: req.body.name,
            surname: req.body.surname,
            photo: req.file ? req.file.path : '',
            year: req.body.year
        }).save();
        res.status(201).json(actor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        surname: req.body.surname,
        year: req.body.year
    };
    if (req.file) {
        updated.photo = req.file.path
    }
    try {
        const actor = await Actor.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(201).json(actor);
    } catch (e) {
        errorHandler(res, e);
    }
};
