
function transformReservationDataToSaveInDB(reservationData) {
    
    let Reservation = {
        user : {
            name : reservationData.nameUser,
            phone: reservationData.phoneNumber
        },
        reserv : {
            name: reservationData.nameUser,
            phone: reservationData.phoneNumber,
            dateReserv: convertToDateTime(reservationData.dateReserv, reservationData.timeReserv),
            guests: reservationData.numberGuests,
            isPS4: reservationData.isPS4,
            comment: reservationData.comment
        }
    };

    return Reservation;
}

function convertToDateTime(dateReserv, timeReserv) {

    let dateReservationWithoutTime = getDateReserv(dateReserv);
    let hoursRegex = new RegExp('^[0-9]{1,2}(?<=[:.,-;])');
    let minutesRegex = new RegExp('(?<=[:.,-;])[0-9]{2}$');
    let hours = hoursRegex.exec(timeReserv).shift();
    let minutes = minutesRegex.exec(timeReserv).shift();

    dateReservationWithoutTime.setHours(hours);
    dateReservationWithoutTime.setMinutes(minutes);

    return dateReservationWithoutTime;
}

function getDateReserv(dateReserv) {
    let dateNow =  new Date();
    if(dateReserv == 'today') {
        return dateNow;
    } else { // tomorrow
        return dateNow.setDate(dateNow.getDay() + 1);
    }
}

module.exports.transformReservationDataToSaveInDB = transformReservationDataToSaveInDB;

/*
    isPS4 : isPS4,
    phoneNumber : self.phoneNumber(),
    nameUser : self.nameUser(),
    numberGuests : self.numberGuests(),
    dateReserv: dateReserv,
    timeReserv: timeReserv,
    comment: comment
                     */