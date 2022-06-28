var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const layouts = require("express-ejs-layouts");
const axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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