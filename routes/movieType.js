var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* GET (single) movie */
router.get('/:type', function(req, res, next) {
    var sort = {};
    sort['Rating.Rating'] = -1;
  Movie.find({Genres:req.params.type}, 'MovieID Rating', { skip: 0, limit: 100, sort: sort }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
