var express = require('express');
var router = express.Router();
// req驗證
router.all('**',function(req,res,next){
	console.log('the request is authed! ')
	next()
});

module.exports = router;