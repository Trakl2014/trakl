var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TravelTimeSchema   = new Schema({
    userId: String,
    journeyRef: String,
    travelMinutes: Number,
    isImproving: Boolean
});

module.exports = mongoose.model('TravelTime', TravelTimeSchema);
