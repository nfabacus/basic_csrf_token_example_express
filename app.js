var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session'); // require cookie session

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up the cookie for the session
app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
