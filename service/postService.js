var _=require('underscore');
var Post=require('../model/post');
// 取得指定文章
exports.getOne = function(id,callback){
	Post.findOne({_id:id}).lean().exec(function(error,result){
		if(error)
			throw error;
		
		callback(result);
	})
}
// 取得所有文章
exports.getAll = function(callback){
	Post.find().lean().exec(function(error,result){
		callback(result);
	})
}
// 新增文章
exports.create = function(data,callback){
	var post=new Post(data);
	post.save(function(error,result){
		if(error)
			throw error;
		
		callback( result.toObject());
	})
}
// 更新文章
exports.update = function(id){
	return postList;
}
// 刪除文章
exports.update = function(id){
	return postList;
}