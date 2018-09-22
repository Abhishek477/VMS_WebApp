var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var requestIP = require('request-ip');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginPageRouter = require('./routes/login-page');
var collectionRouter = require('./routes/collection');
var dashboardDRouter = require('./routes/dashboardD');
var dashboardORouter = require('./routes/dashboardO');
var mapRouter = require('./routes/map');
var notificationsRouter = require('./routes/notifications');
var profilePageRouter = require('./routes/profile-page');
var tablesRouter = require('./routes/tables');
var userRouter = require('./routes/user');
var regPageRouter = require('./routes/reg-form');
// var nodeMail = require('./public/nodemailer/sendGrid');

//DB config
// require('./config/firebaseConfig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIP.mw());

// app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/login-page', loginPageRouter);
app.use('/collection', collectionRouter);
app.use('/dashboardD', dashboardDRouter);
app.use('/dashboardO', dashboardORouter);
app.use('/map', mapRouter);
app.use('/notifications', notificationsRouter);
app.use('/profile-page', profilePageRouter);
app.use('/tables', tablesRouter);
app.use('/user', userRouter);
app.use('/reg-form', regPageRouter);

app.get("/", (req,res) => {
  // nodeMail.sendMail();
  var ip = req.clientIp;
  console.log("\nClient IP Address : " + ip + "\n");
  res.render("index");
});


//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Cors
app.use(cors());

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
