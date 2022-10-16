const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    phoneNo: {
        type: String
    },
    userLevel: {
        type: String
    }
});

module.exports = mongoose.model('User', User);