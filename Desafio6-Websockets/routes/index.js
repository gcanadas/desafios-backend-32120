var express = require('express');
var router = express.Router();
const {productos} = require('../sockets')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Desafío 6: Websockets', isEmpty: !productos.length });
});

module.exports = router;
