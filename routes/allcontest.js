var express = require('express');
var passport = require('passport');
const bodyParser = require('body-parser');
var router = express.Router();
var authenticate = require('../authenticate');
var currcontests = require('../models/allcontestmodel');
const cors = require('./cors');
router.use(bodyParser.json());

router.route('/').options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.get('/', cors.cors, (req, res, next) => {
  currcontests
    .findById('5f6afd6a396c552b307a06db')
    .then(
      (currcontestsfound) => {
        if (currcontestsfound) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(currcontestsfound);
        } else {
          err = new Error('User not found');
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
module.exports = router;
