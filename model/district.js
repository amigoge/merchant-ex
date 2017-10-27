var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var districtSchema = new Schema({
    name: String,
    zipCode: String,
    city: {type: Schema.Types.ObjectId, ref: 'City'}
});

module.exports = mongoose.model('District', districtSchema);