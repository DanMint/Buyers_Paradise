var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const layouts = require("express-ejs-layouts");
const axios = require('axios');
const session = require("express-session"); // to handle sessions using cookies
const exam5 = require('./routes/exam5');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// *********************************************************** //
//  Connecting to the database
// *********************************************************** //

const mongoose = require( 'mongoose' );
//const mongodb_URI = 'mongodb://localhost:27017'
const mongodb_URI = 'mongodb+srv://cs_sj:BrandeisSpr22@cluster0.kgugl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
// fix deprecation warnings
// mongoose.set('useFindAndModify', false); 
// mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

const isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  }
  else res.redirect('/login')
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(exam5);

app.use(
  session({
    secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
    resave: false,
    saveUninitialized: false
  })
);

const auth = require('./routes/auth')
app.use(auth)

app.use(layouts);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static("./path-to-views/public"));


app.get("/FinancialCalculator",
 (req,res,next) => {
   res.render("FinancialCalculator")})

app.post("/FinancialCalculator",
 (req,res,next) => {
   const {spend, income, down} = req.body;
   res.locals.spend = spend;
   res.locals.income = income;
   res.locals.down = down;
   res.locals.payment = (spend - down) / 12;
   res.render("FinancialCalculatorResult")
 })

app.get('/cryptoApi',
  isLoggedIn,
  async (req,res,next) => {
  const response = await axios.get('https://nova.bitcambio.com.br/api/v3/public/getassets')
  console.dir(response.data.length)
  res.locals.results = response.data.result
  res.render('apiTrial')
})

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