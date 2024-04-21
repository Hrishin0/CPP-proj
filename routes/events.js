var express = require('express');
var router = express.Router();
var connection = require('../database.js')

router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM Events ORDER BY id desc', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('page1', { data: '' })
    } else {
      res.render('page1', { data: rows })
    }
  })
})
module.exports = router