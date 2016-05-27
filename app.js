var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var about = require('./routes/about');
var sign_buyer = require('./routes/sign_buyer');
var sign_insert = require('./routes/sign_insert');
var log_in = require('./routes/log_in');
var log_out = require('./routes/log_out');
var login_check = require('./routes/login_check');

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
app.use('/sign_buyer', sign_buyer);
app.use('/sign_insert', sign_insert);
app.use('/log_in', log_in);
app.use('/log_out', log_out);
app.use('/login_check', login_check);

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
