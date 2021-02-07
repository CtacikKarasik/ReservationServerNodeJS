const mongoose = require("../libs/mongoose");

const Schema = mongoose.Schema;

let schema = new Schema({
    status:{
        type: String,
        default: "registered",
        unique: false,
        required: true
    },
    username:{
        type: String,
        unique: false,
        required: true
    },
    numberphone:{
        type: Number,
        unique: false,
        required: true
    },
    ps4:{
        type: Boolean,
        unique: false,
        required: false
    },
    numberguests: {
        type: Number ,
        unique: false,
        required: true
    },
    datereserv: {
        type: Date,
        unique: false,
        required: true
    },
    comment: {
        type: String,
        default: "empty",
        unique: false,
        required: false
    }
});

exports.Reservation = mongoose.model('reservation', schema);