
function isValidData(reservationData) {
    if(isExistRequiredData(reservationData)) {
        return true;
    } else {
        return false;
    }
}

function isExistRequiredData(reservationData) {
    
    let nameUser = (reservationData.nameUser != null || undefined) ? reservationData.nameUser : '';
    let phoneNumber = (reservationData.phoneNumber != null || undefined) ? reservationData.phoneNumber : '';
    let dateReserv = (reservationData.dateReserv != null || undefined) ? reservationData.dateReserv : '';
    let timeReserv = (reservationData.timeReserv != null || undefined) ? reservationData.timeReserv : '';

    console.log("nameUser - " + nameUser);
    console.log("phoneNumber - " + phoneNumber);
    console.log("timeReserv - " + timeReserv);

    if(nameUser.length < 3 || phoneNumber.length < 11 || timeReserv.length < 1 || dateReserv.length < 1) {
        return false;
    }

    return true;
}

module.exports.isValidData = isValidData;

/*
    isPS4 : isPS4,
    phoneNumber : self.phoneNumber(),
    nameUser : self.nameUser(),
    numberGuests : self.numberGuests(),
    dateReserv: dateReserv,
    timeReserv: timeReserv,
    comment: comment
                     */