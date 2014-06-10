var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // userId: String,
    // journeyRef: String,
    // travelMinutes: String,
    // isImproving: String,
    id: String,
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
    journey: String
});




module.exports = mongoose.model('User', UserSchema);