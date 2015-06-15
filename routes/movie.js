var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/Movie.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
    var offset, limit, sortField, sortDirection;
    
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
    console.log("req.query.sorting " + req.query.sorting);
    if (req.query.sorting) {
        if (req.query.sorting.indexOf('Up') > -1) {
            sortDirection = 1;
        } else {
            sortDirection = -1;
        }
        if (req.query.sorting.indexOf('rating') > -1) {
            sortField = 'Rating.Rating';
        } else {
            sortField = 'MovieID';
        }
    } else {
        sortField = 'MovieID';
        sortDirection = 1;
    }
    console.log("sortField " + sortField);
    console.log("sortDirection " + sortDirection);
    var sort = {};
    sort[sortField] = sortDirection;
  Movie.find({}, 'MovieID Rating', { skip: offset, limit: limit, sort: sort }, function (err, movies) {
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
