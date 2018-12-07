const Vote = require('../models/Vote');
const errorHandler = require('../utils/errorHandler');

module.exports.getByMovieId = async (req, res) => {
    try {
        const vote = await Vote.find({movie: req.params.id});
        res.status(200).json(vote);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getByMovieAndUserId = async (req, res) => {
    try {
        const vote = await Vote.findOne({
            movie: req.params.id,
            user: req.query.userId
        });
        res.status(200).json(vote);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Vote.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const vote = await new Vote({
            mark: req.body.mark,
            movie: req.body.movie,
            user: req.body.user
        }).save();
        res.status(201).json(vote);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        mark: req.body.mark,
        movie: req.body.movie,
        user: req.body.user
    };
    try {
        const vote = await Vote.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(201).json(vote);
    } catch (e) {
        errorHandler(res, e);
    }
};
