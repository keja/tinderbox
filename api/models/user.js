var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    facebook_token: String,
    hardware_id: String,
    artists: Array,
    groups: Array,
    location: Array
}));