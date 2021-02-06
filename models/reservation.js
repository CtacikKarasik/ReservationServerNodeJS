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
    },
    ps4:{
        type: Boolean,
        unique: false,
        required: false
    },
    numberguests: {
        type: Integer ,
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
        unique: false,
        required: true
    }
});

exports.Reservation = mongoose.model('reservation', schema);