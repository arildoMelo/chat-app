const moment = require('moment');


module.exports.generateMessage = (from, text) => {
    return {
        from,
        text, 
        createAt: moment().valueOf()
    }
}

module.exports.generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createAt: moment().valueOf()
    }
}