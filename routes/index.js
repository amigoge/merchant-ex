var express = require('express');
var router = express.Router();
var backstageController=require('../controller/backstageController');

router.get('',backstageController.index);
// 若res沒有respond就會進來這裡
router.get('/*', function(req, res, next) {
  console.log('it pass the original index route')
  next();
});

module.exports = router;
