var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')

const DB = require('./database/DB/connect').conn()
const session = require('express-session')

hbs.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
      return opts.fn(this);
  else
      return opts.inverse(this);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
 });

var indexRouter  = require('./routes/index');
var signRouter   = require('./routes/sign');
var logoutRouter = require('./routes/logout');
var uploadRouter = require('./routes/upload');
var fileRouter   = require('./routes/file');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static('C:\\uploads'));
app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/sign', signRouter);
app.use('/logout', logoutRouter)
app.use('/upload', uploadRouter)
app.use('/file', fileRouter)

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
