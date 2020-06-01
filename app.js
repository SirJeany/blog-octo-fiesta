var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookie = require('cookie');
let session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

let indexRouter = require('./routes/index');
let viewPostRouter = require('./routes/view-post');
let createPostRouter = require('./routes/create-post');
let updatePostRouter = require('./routes/update-post');
let deletePostRouter = require('./routes/update-post');
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let archivesRouter = require('./routes/archives');
let miscRouter = require('./routes/misc');
// Testing mongoDB:
let createListingRouter = require('./routes/create-listing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NECESSARY FOR USING THE 'body' WHEN RENDERING
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// support parsing of application/json type post data
app.use(bodyParser.json());

// Session for login:
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// MONGODB SETUP:
// const uri = "mongodb+srv://blog_man:s12572@blog-cluster-8ad2j.mongodb.net/test?retryWrites=true&w=majority";
/**
* The Mongo Client you will use to interact with your database
* See bit.ly/Node_MongoClient for more details
*/
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // Making use of promises
// client.connect().then(client =>{
//   const db = client.db('my_blog');
//   const myPostCollection = db.collection('my_posts');
//   console.log('Connected to the db... ');
//   // app.use(db);
// })
// .catch(error => console.error(error));

let mongo = require('./mongo');
// app.use('/', mongo);

app.use('/', indexRouter);
app.use('/view-post', viewPostRouter);
app.use('/create-post', createPostRouter);
app.use('/update-post', updatePostRouter);
app.use('/update-post/delete', deletePostRouter);
app.use('/register', registerRouter);
app.use('/register/register-success', registerRouter);
app.use('/login', loginRouter);
app.use('/archives', archivesRouter);
app.use('/misc', miscRouter);
// Mongo DB testing:
app.use('/create-listing', createListingRouter);

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

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// module.exports = app;

module.exports = app;
app.listen(8080);