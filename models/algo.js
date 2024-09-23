const Schema = require('mongoose').Schema;
const { mongoose } = require('../config/db');

const Algo = mongoose.model('Algo',{
    name: String,
    category: String,
    timeComplexity: String,
    spaceComplexity: String,
    dateAdded: Date,
    description: String,
    pseudocode: String,
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Algo;
