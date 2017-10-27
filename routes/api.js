var express = require('express');
var router = express.Router();
var postService=require('../service/postService');
var addressService=require('../service/addressService');
// 取得所有文章
router.get('/post', function(req, res, next) {
	postService.getAll(function(result){
		res.json(result);
	});
});
// 取得指定文章
router.get('/post/:id', function(req, res, next) {
	var id=req.params.id;
	postService.getOne(id,function(result){
		res.json(result);
	});
});
// 新增文章
router.post('/post',function(req,res,next){
	var data=req.body;
	postService.create(data,function(result){
		res.json(result);
	})
});
// 更新文章
router.put('/post',function(req,res,next){
	var data=JSON.stringify(req.body);
	res.json({data:data,msg:`post 更新成功！`})
});
// 刪除文章
router.delete('/post/:id',function(req,res,next){
	res.json(`post:${req.params.id} 刪除成功！`)
});
// 新增地址資訊
router.post('/address',function(req,res,next){
	var data=req.body;
	addressService.create(data,function(result){
		res.json(result);
	})
});

module.exports = router;
