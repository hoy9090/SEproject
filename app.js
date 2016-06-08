var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var about = require('./routes/about');
var qna = require('./routes/qna');
var sign = require('./routes/sign');
var sign_insert = require('./routes/sign_insert');
var login = require('./routes/login');
var logout = require('./routes/logout');
var login_check = require('./routes/login_check');
var sign_FB = require('./routes/sign_FB');
var shopping_cart = require('./routes/shopping_cart');

var community = require('./routes/community');

//product features

var customize = require('./routes/customize');
var product = require('./routes/product');
var product_list = require('./routes/product_list');
var reg_product = require('./routes/reg_product');
var payment = require('./routes/payment');

var mypage_buyer = require('./routes/mypage_buyer');
var mypage_seller = require('./routes/mypage_seller');

var thread = require('./routes/thread');
var order_list = require('./routes/order_list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 80);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/community', express.static(path.join(__dirname, 'public')));
app.use('/community/:type', express.static(path.join(__dirname, 'public')));

// session config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.loggedIn = req.session.userno ? true : false;
  res.locals.isBuyer = req.session.isBuyer ? true : false;
  next();
});

app.use('/', index);
app.use('/about', about);
app.use('/qna', qna);
app.use('/sign', sign);
app.use('/sign_insert', sign_insert);
app.use('/login', login);
app.use('/logout', logout);
app.use('/login_check', login_check);
app.use('/sign_FB', sign_FB);
app.use('/shopping_cart', shopping_cart);

app.use('/community', community);
app.use('/payment', payment);

app.use('/customize', customize);
app.use('/product', product);
app.use('/product_list', product_list);
app.use('/reg_product', reg_product);
app.use('/thread', thread);

app.use('/mypage_buyer', mypage_buyer);
app.use('/mypage_seller', mypage_seller);

app.use('/order_list', order_list);

app.listen(app.get('port'), function() {
  console.log('Server is running...!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
