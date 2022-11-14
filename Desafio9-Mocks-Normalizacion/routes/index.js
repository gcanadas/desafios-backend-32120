var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Desafío 9: Mocks y Normalización' });
});

module.exports = router;
