const mongoose = require("../libs/mongoose");

const Schema = mongoose.Schema;

let schema = new Schema({
    username:{
        type: String,
        unique: false,
        required: true
    },
    numberphone:{
        type: Number,
        unique: true,
        required: true
    }
});

exports.User = mongoose.model('users', schema);