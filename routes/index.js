var express = require('express');
var router = express.Router();
var StudentModel = require('../models/student');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insert', function (req, res, next) {
  StudentModel
  .create(req.body)
  .then(
    (data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    },
    (err) => next(err)
  ).catch((err) => next(err));
});


router.get('/find', function (req, res, next) {
  StudentModel
  .find({})
  .then(
    (data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    },
    (err) => next(err)
  ).catch((err) => next(err));
});



router.get('/findfirst', function (req, res, next) {
  StudentModel
  .findOne({StudentId: { $gt: 10 }})
  .then(
    (data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    },
    (err) => next(err)
  ).catch((err) => next(err));
});


module.exports = router;
