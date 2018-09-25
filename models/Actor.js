const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('actors', actorsSchema);