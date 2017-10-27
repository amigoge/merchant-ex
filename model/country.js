var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: String,
    cities: [{type: Schema.Types.ObjectId, ref: 'City'}]
});

module.exports = mongoose.model('Country', countrySchema);