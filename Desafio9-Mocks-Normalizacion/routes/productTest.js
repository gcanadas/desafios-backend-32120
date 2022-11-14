const express = require('express');
const randomProducts = require('../controllers/fakerController');
const router = express.Router();


router.get('/', (req, res, next) => {
      try {
            data = randomProducts();
            data = {title: "Mocks y Normalización", ...data};
            res.render('productos-test', data);
      } catch (error) {
            next(error);
      }
});

module.exports = router;