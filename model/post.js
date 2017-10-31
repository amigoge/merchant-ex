var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    content: String,
    title: String,
    city: String,
    marketStart: Date,
    marketEnd: Date
});

module.exports = mongoose.model('Post', postSchema);