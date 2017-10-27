var _ = require('underscore');
var Address = require('../model/address');
// 取得指定地址
exports.getOne = function (id, next, callback) {
    Address.findOne({_id: id}).lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 取得所有地址
exports.getAll = function (next, callback) {
    Address.find().lean().exec(function (error, result) {
        if (error)
            return next(error)

        callback(result);
    })
}
// 新增地址
exports.create = function (data, next, callback) {
    var address = new Address(data);
    address.save(function (error, result) {
        if (error)
            next(error);

        callback(result.toObject());
    })
}
// 更新地址
exports.update = function (idd, data, next, callback) {
    Address.update({_id: id}, data).exec(function (error, result) {
        if (error)
            next(error);

        callback(result.ok == 1 ? {success: true} : {success: false});
    })
}
// 刪除地址
exports.delete = function (id, next, callback) {
    Address.findByIdAndRemove(id, function (error, result) {
        if (error)
            next(error);

        callback(result);
    })
}