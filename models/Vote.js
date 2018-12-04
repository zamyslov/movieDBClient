const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votesSchema = new Schema({
    mark: {
        type: Number,
        required: true
    },
    movie: {
        ref: 'movies',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('votes', votesSchema);