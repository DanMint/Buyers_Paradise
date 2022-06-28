var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/breitling',
  (req,res,next) => {
   console.log("in the index router")
   next()
  },
  (req,res,next) => {
    res.render('breitling')
  }
)

router.get('/taghuer',
  (req,res,next) => {
   console.log("in the index router")
   next()
  },
  (req,res,next) => {
    res.render('taghuer')
  }
)

router.get('/Hubolt',
  (req,res,next) => {
   console.log("in the index router")
   next()
  },
  (req,res,next) => {
    res.render('Hubolt')
  }
)

router.get('/FinancialCalculator',
  (req,res,next) => {
   console.log("in the index router")
   next()
  },
  (req,res,next) => {
    res.render('FinancialCalculator')
  }
)

router.get('/apiTrial',
  (req,res,next) => {
   console.log("in the index router")
   next()
  },
  (req,res,next) => {
    res.render('apiTrial')
  }
)


module.exports = router;
