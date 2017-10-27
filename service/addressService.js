var _ = require('underscore');
var Country = require('../model/country');
var City = require('../model/city');
var District = require('../model/district');
// 取得指定國家
exports.getCountry = function (id, next, callback) {
    Country.findOne({_id: id}).lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 取得所有國家
exports.getCountries = function (next, callback) {
    Country.find().lean().exec(function (error, result) {
        if (error)
            return next(error)

        callback(result);
    })
}
// 新增國家
exports.createCountry = function (data, next, callback) {
    var country = new Country(data);
    country.save(function (error, result) {
        if (error)
            next(error);

        callback(result.toObject());
    })
}
// 更新國家
exports.updateCountry = function (idd, data, next, callback) {
    Country.update({_id: id}, data).exec(function (error, result) {
        if (error)
            next(error);

        callback(result.ok == 1 ? {success: true} : {success: false});
    })
}
// 刪除國家
exports.deleteCountry = function (id, next, callback) {
    Country.findByIdAndRemove(id, function (error, result) {
        if (error)
            next(error);

        callback(result);
    })
}

// 取得指定城市
exports.getCity = function (id,countryID, next, callback) {
    City.findOne({country_id:countryID,_id: id}).lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 取得所有城市
exports.getCities = function (countryID,next, callback) {
    City.find({country_id:countryID}).lean().exec(function (error, result) {
        if (error)
            return next(error)

        callback(result);
    })
}
// 新增城市
exports.createCity = function (data, next, callback) {
    var city = new City(data);
    city.save(function (error, result) {
        if (error)
            next(error);

        callback(result.toObject());
    })
}
// 更新城市
exports.updateCity = function (idd, data, next, callback) {
    City.update({_id: id}, data).exec(function (error, result) {
        if (error)
            next(error);

        callback(result.ok == 1 ? {success: true} : {success: false});
    })
}
// 刪除城市
exports.deleteCity = function (id,countryID, next, callback) {
    City.findByIdAndRemove(id, function (error, result) {
        if (error)
            next(error);

        callback(result);
    })
}

// 取得指定地區
exports.getDistrict = function (id, next, callback) {
    District.findOne({_id: id}).lean().exec(function (error, result) {
        if (error)
            return next(error);

        callback(result);
    })
}
// 取得所有地區
exports.getDistricts = function (next, callback) {
    District.find().lean().exec(function (error, result) {
        if (error)
            return next(error)

        callback(result);
    })
}
// 新增地區
exports.createDistrict = function (data, next, callback) {
    var district = new District(data);
    district.save(function (error, result) {
        if (error)
            next(error);

        callback(result.toObject());
    })
}
// 更新地區
exports.updateDistrict = function (idd, data, next, callback) {
    District.update({_id: id}, data).exec(function (error, result) {
        if (error)
            next(error);

        callback(result.ok == 1 ? {success: true} : {success: false});
    })
}
// 刪除地區
exports.deleteDistrict = function (id, next, callback) {
    District.findByIdAndRemove(id, function (error, result) {
        if (error)
            next(error);

        callback(result);
    })
}