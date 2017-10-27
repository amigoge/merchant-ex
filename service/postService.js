var _ = require('underscore');
var Post = require('../model/post');
// 取得指定文章
exports.getOne = function (id, next, callback) {
    Post.findOne({_id: id}).lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 取得所有文章
exports.getAll = function (next, callback) {
    Post.find().lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 新增文章
exports.create = function (data, next, callback) {
    var post = new Post(data);
    post.save(function (error, result) {
        if (error)
            return next(error);

        callback(result.toObject());
    })
}
// 更新文章
exports.update = function (id, data, next, callback) {
    Post.update({_id: id}, data).exec(function (error, result) {
        if (error)
            return next(error);

        callback(result.ok == 1 ? {success: true} : {success: false});
    })
}
// 刪除文章
exports.delete = function (id, next, callback) {
    Post.findByIdAndRemove(id, function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}