var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
  Movie.find(function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
});

/* POST (save) movie */
router.post('/', function(req, res, next) {

  var m = new Movie(req.body);

  m.save(function(err, post) {
        if(err) {
            console.log(err);
            res.status(400);
            res.send(err);
        }
        else {
            res.json(post);
        }
    });
});

/* GET (single) movie */
router.get('/:id', function(req, res, next) {
  Movie.find({MovieID:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
