var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    userId: String,
    email: String,
    first_name: String,
    gender: String,
    last_name: String,
    link: String,
    locale: String,
    name: String,
    timezone: String,
    updated_time: String,
    verified: String,
    journeyRef: String,
    deviceType: String,
    deviceIdentifier: String,
    travekMinutes: String,
    isImproving: String

});




module.exports = mongoose.model('User', UserSchema);