const express = require('express');
const { faker } = require('faker-js/faker/locale/es');
const router = express.Router();

const { commerce, internet } = faker;


router.get('/productos-test/', (req, res, next) => {
      try {
            let data = [];

            for (let i = 0; i < 5; i++) {
                  data[i].push({
                        name: commerce.product(),
                        price: commerce.price(),
                        URL: internet.avatar(),
                  });
            }
            res.render('./productos-test', data);
      } catch (error) {
            next(error);
      }
});

module.exports = router;