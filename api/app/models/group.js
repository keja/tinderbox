var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

module.exports = mongoose.model('Group', new Schema({
    name: String,
    members: Array,
    artists: Array
}));