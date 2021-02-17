const User = require('../models/user').User;
const Reservation = require('../models/reservation').Reservation;
const inspector = require('./dataValidation');
const collectorData  = require('./dataPreparation');

function saveReservationData(reservationData) {

    if(inspector.isValidData(reservationData)) {
        let reservationObj = collectorData.transformReservationDataToSaveInDB(reservationData);

        let user = new User({
            username: reservationObj.user.name,
            numberphone: reservationObj.user.phone
        });

        let reservation = new Reservation({
            status: reservationObj.reserv.status,
            username: reservationObj.reserv.name,
            numberphone: reservationObj.reserv.phone,
            ps4 : reservationObj.reserv.isPS4,
            numberguests: reservationObj.reserv.guests,
            datereserv: reservationObj.reserv.dateReserv,
            comment: reservationObj.reserv.comment
        });

        reservation.save().then(() => console.log('SAVE in reservation db'));


        User.findOne({numberphone: user.numberphone}, function(err, doc) {    
            if(err) return console.log(err);
             
            console.log('--- findOne: ' + doc);
            if(doc === null) {
                user.save().then(() => console.log('SAVE in user db'));
            }  else {
                console.log('User:' + user.username + " with phone:" + user.numberphone + " exist!");
            }

        });
        

        console.log("data seving ...");
    } else {
        console.log("data incorrect !!!");
    }
    
}

function getListReservedTables(startDate, endDate, callback) {
    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    Reservation.find({$and: [{datereserv : {$gte:startDateTime}}, {datereserv : {$lte:endDateTime}}]}, function(err, doc) {    
        if(err) return console.log(err);
        callback(doc);
    });

    console.log("get ListReservedTables ...");
}

module.exports.saveReservationData = saveReservationData;
module.exports.getListReservedTables = getListReservedTables;