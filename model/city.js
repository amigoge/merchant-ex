var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Country=require('./country');
var District=require('./district');

var citySchema = new Schema({
    name: String,
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    districts:[{type:Schema.Types.ObjectId,ref:'District'}]
});

// cascading middleware
citySchema.pre('remove',function(next){
    District.remove({city_id:this._id}).exec();
    Country.update(
        {city_id:this._id},
        {$pull:{city_id:this._id}},
        {multi:true}).exec();
    next()
})

module.exports = mongoose.model('City', citySchema);