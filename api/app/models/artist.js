var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

module.exports = mongoose.model('Artist', new Schema({
    name: String,
    stage: String,
    time_start: Date,
    time_end: Date,
    image: String,
    description: String
}));