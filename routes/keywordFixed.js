var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
  Movie.aggregate([{$unwind: "$Keywords"}, {$group: {_id: "$Keywords", number: {$sum: 1}}}, { $sort : { number : -1 } }, { $limit : 100 }], function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
});

module.exports = router;
