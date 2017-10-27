var _=require('underscore');
var Address=require('../model/address');
// 取得指定文章
exports.getOne = function(id){
	return _.find(postList,{id:id});
}
// 取得所有文章
exports.getAll = function(callback){
	Address.find().lean().exe(function(error,result){
		callback(result);
	})
}
// 新增文章
exports.create = function(data,callback){
	var address=new Address(data);
	address.save(function(error,result){
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