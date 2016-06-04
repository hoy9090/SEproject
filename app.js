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

// Notice board
var notice = require('./routes/notice');
var notice_write = require('./routes/notice_write');
var notice_insert = require('./routes/notice_insert');
var notice_view = require('./routes/notice_view');
var notice_search = require('./routes/notice_search');

// Lectures board
var lectures = require('./routes/lectures');
var lectures_write = require('./routes/lectures_write');
var lectures_insert = require('./routes/lectures_insert');
var lectures_view = require('./routes/lectures_view');
var lectures_search = require('./routes/lectures_search');

// Free Topic board
var free_board = require('./routes/free_board');
var free_board_write = require('./routes/free_board_write');
var free_board_insert = require('./routes/free_board_insert');
var free_board_view = require('./routes/free_board_view');
var free_board_search = require('./routes/free_board_search');

// News & Magazines board
var news = require('./routes/news');
var news_write = require('./routes/news_write');
var news_insert = require('./routes/news_insert');
var news_view = require('./routes/news_view');
var news_search = require('./routes/news_search');

//product features
var product = require('./routes/product');


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

// session config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.loggedIn = req.session.userno ? true : false;
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

app.use('/notice', notice);
app.use('/notice_write', notice_write);
app.use('/notice_insert', notice_insert);
app.use('/notice_view', notice_view);
app.use('/notice_search', notice_search);

app.use('/lectures', lectures);
app.use('/lectures_write', lectures_write);
app.use('/lectures_insert', lectures_insert);
app.use('/lectures_view', lectures_view);
app.use('/lectures_search', lectures_search);

app.use('/free_board', free_board);
app.use('/free_board_write', free_board_write);
app.use('/free_board_insert', free_board_insert);
app.use('/free_board_view', free_board_view);
app.use('/free_board_search', free_board_search);

app.use('/news', news);
app.use('/news_write', news_write);
app.use('/news_insert', news_insert);
app.use('/news_view', news_view);
app.use('/news_search', news_search);

app.use('/product', product);

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
