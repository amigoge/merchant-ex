var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema=new Schema({
	content:            String,
	title:              String,
	location:{
		city:       String,
		district:   String
	}
});

module.exports=mongoose.model('Post',postSchema);