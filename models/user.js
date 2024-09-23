const Schema = require('mongoose').Schema;
const { mongoose } = require('../config/db');

const User = mongoose.model('User',{
    username: String,
    password: String,
    phone: String,
    address: String,
    specialized: String
});

module.exports = User;
