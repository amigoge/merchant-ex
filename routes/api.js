var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var addressService = require('../service/addressService');
// 取得所有文章
router.get('/post', function (req, res, next) {
    postService.getAll(next,function (result) {
        res.json(result);
    });
});
// 取得指定文章
router.get('/post/:id', function (req, res, next) {
    var id = req.params.id;
    postService.getOne(id,next, function (result) {
        res.json(result);
    });
});
// 新增文章
router.post('/post', function (req, res, next) {
    var data = req.body;
    postService.create(data,next, function (result) {
        res.json(result);
    })
});
// 更新文章
router.put('/post', function (req, res, next) {
    var id = req.body.targetID;
    var data = req.body.target;
    postService.update(id, data,next, function (result) {
        res.json(result);
    })
});
// 刪除文章
router.delete('/post/:id', function (req, res, next) {
    var id = req.params.id;
    postService.delete(id, next,function (result) {
        res.json(result)
    })
});


// 查詢國家
router.get('/country', function (req, res, next) {
    addressService.getCountries(next,function (result) {
        res.json(result);
    })
});
// 新增國家
router.post('/country', function (req, res, next) {
    var data = req.body;
    addressService.createCountry(data,next, function (result) {
        res.json(result);
    })
});
// 查詢指定國家
router.get('/country/:id', function (req, res, next) {
    var id = req.params.id;
    addressService.getCountry(id,next,function (result) {
        res.json(result);
    })
});
// 刪除國家
router.delete('/country/:id', function (req, res, next) {
    var id = req.params.id;
    addressService.deleteCountry(id,next, function (result) {
        res.json(result);
    })
});

// 查詢城市
router.get('/city/:countryID', function (req, res, next) {
    var countryID=req.params.countryID;
    addressService.getCities(countryID,next,function (result) {
        res.json(result);
    })
});
// 新增城市
router.post('/city/:countryID', function (req, res, next) {
    var data = req.body;
    data.country_id=req.params.countryID;
    addressService.createCity(data,next, function (result) {
        res.json(result);
    })
});
// 查詢指定城市
router.get('/city/:countryID/:id', function (req, res, next) {
    var cityID=req.params.id;
    var countryID=req.params.countryID;
    addressService.getCity(cityID,countryID,next,function (result) {
        res.json(result);
    })
});
// 刪除城市
router.delete('/city/:countryID/:id', function (req, res, next) {
    var countryID=req.params.countryID;
    var cityID=req.params.id;
    addressService.deleteCity(cityID,countryID,next, function (result) {
        res.json(result);
    })
});

module.exports = router;
