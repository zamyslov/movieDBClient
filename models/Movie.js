const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    poster: {
        type: String
    },
    about: {
        type: String
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    list: [
        {
            id: {
                ref: 'actors',
                type: Schema.Types.ObjectId
            }
        }
    ]
});

module.exports = mongoose.model('movies', moviesSchema);