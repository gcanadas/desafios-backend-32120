var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Desafío 6: Websockets', isEmpty: false });
});

module.exports = router;
