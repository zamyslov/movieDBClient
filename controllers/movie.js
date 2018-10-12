const Movie = require('../models/Movie');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const movie = await Movie.find()
            .sort({name: +1})
            .skip(+req.query.offset)
            .limit(req.query.limit);
        res.status(200).json(movie);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Movie.remove(req.params.id);
        res.status(200).json({
            message: 'Позиция удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const movie = await new Movie({
            name: req.body.name,
            year: req.body.year,
            about: req.body.about,
            poster: req.file ? req.file.path : '',
            category: req.body.category.id,
            actors: JSON.parse(req.body.actors)
        }).save();
        res.status(201).json(movie);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        year: req.body.year,
        category: req.body.category.id
    };
    if (req.file) {
        updated.photo = req.file.path
    }
    try {
        const movie = await Movie.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(201).json(movie);
    } catch (e) {
        errorHandler(res, e);
    }
};
