var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var addressService = require('../service/addressService');
// 取得所有文章
router.get('/post', function (req, res, next) {
    postService.getAll(next, function (result) {
        res.json(result);
    });
});
// 取得指定文章
router.get('/post/:id', function (req, res, next) {
    var id = req.params.id;
    postService.getOne(id, next, function (result) {
        res.json(result);
    });
});
// 新增文章
router.post('/post', function (req, res, next) {
    var data = req.body;
    data.marketStart = new Date(data.marketStart);
    data.marketEnd = new Date(data.marketEnd);
    postService.create(data, next, function (result) {
        res.json(result);
    })
});
// 更新文章
router.put('/post', function (req, res, next) {
    var id = req.body.targetID;
    var data = {
        title: req.body.title,
        content: req.body.content,
        city: req.body.city
    };
    postService.update(id, data, next, function (result) {
        res.json(result);
    })
});
// 刪除文章
router.delete('/post/:id', function (req, res, next) {
    var id = req.params.id;
    postService.delete(id, next, function (result) {
        res.json(result)
    })
});

module.exports = router;
