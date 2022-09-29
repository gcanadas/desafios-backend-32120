var express = require('express');
var router = express.Router();

const productos =[];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { productos, isEmpty: !productos.length });
});

router.post('/productos', function(req, res, next) {
  productos.push(req.body)
  res.redirect('/');
});

/* GET home page. */
router.get('/productos', function(req, res, next) {
  res.render('products', { productos, isEmpty: !productos.length });
});

module.exports = router;
