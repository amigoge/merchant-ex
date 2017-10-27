var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

// connect to mongoDB
var dbConfig=require('./config/dbConfig').cloud;
var connect=`mongodb://${dbConfig.user}:${dbConfig.pass}${dbConfig.host}`;
mongoose.connect(connect,{
  useMongoClient:true
});
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authFilter=require('./filter/authFilter');// auth filter
var indexRouter = require('./routes/index');        // 前台的routing
var userRouter = require('./routes/users');        // 後台的routing
var apiRouter = require('./routes/api');

var app = express();

// viewTemplate engine設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);           // 後台
app.use('/api',apiRouter);                // api
app.use('/',authFilter, indexRouter);     // 前台

// 沒被處裡的req視為404錯誤
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 錯誤處理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
