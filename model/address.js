var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var addressSchema=new Schema({
	city:            String,
	district:        [{id:String,name:String,zipCode:String}],
});

module.exports=mongoose.model('Address',addressSchema);