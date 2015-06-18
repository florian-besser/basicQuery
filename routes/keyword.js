var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
    var offset, limit;
    
    if (req.query.limit) {
        console.log("Limit set to " + req.query.limit);
        limit = req.query.limit;
    } else {
        limit = 10;
    }
    if (req.query.offset) {
        console.log("Offset set to " + req.query.offset);
        offset = req.query.offset;
    } else {
        offset = 0;
    }
   
  Movie.find({Keywords:{$ne:null}}, 'Keywords', { skip: offset, limit: limit }, function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
});

module.exports = router;
