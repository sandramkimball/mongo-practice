var mongoose = require('mongoose')
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

// Initiate the app
var app = express();

// Import Routes
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cors())

// Api Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Connect to DB wtih Mongo
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
// client.connect(err => {
//   if(err){
//       throw new Error('...oof. No connection.')
//   } else {            
//     const collection = client.db("cats").collection("posts");
//     console.log('---MONGO DB: Connected')
//   }
// })

// Connect to DB with Mongoose
const URI = process.env.DB_CONNECT
const localURI = 'mongodb://localhost:27017/main';

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true}, ()=> console.log('  ---MONGOOSE: connected') )

const db = mongoose.connection
db.once('open', ()=> console.log('  ---DB: connected'))
db.on('error', err => console.log('  ---DB: error!', err))

// Listen to Server
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`  ---PORT: ${PORT}`))

module.exports = app;
