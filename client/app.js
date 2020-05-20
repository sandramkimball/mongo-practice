require('dotenv').config()
var mongoose = require('mongoose')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

//Api Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

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

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, ()=> {
  console.log('---DB: Connected')
})

//Listen to server
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`---PORT: ${PORT}`))

module.exports = app;
