var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    facebook_token: String,
    fb_id: Number, //as we do not have facebook tokens we just hardcode user ids
    hardware_id: String,
    artists: Array,
    groups: Array,
    location: Array,
    image: String,
    name: String
}));