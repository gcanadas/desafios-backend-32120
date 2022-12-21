const express = require ('express');
//const fork = require ('child_process');
const logger = require ('../logger');

const router = express.Router();
// router.get('/random/', async (req, res, next) => {
//       try {
//             let cont = req.query.cant || 100000000;
//             const computo = fork('./controllers/calculo.js', [cont]);
//             computo.on('message', (data) => {
//                   computo.send('hola');
//                   logger.info(`Ruta ${req.originalUrl} metodo GET`);
//                   res.json(data);
//             });
//       } catch (error) {
//             next(error);
//       }
// });

router.get('/random/', async (req, res, next) => {
      try {
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            const cont = req.query.cant || 100000000;
            let numeros = {};
            for (let i = 0; i < cont; i++) {
                  let num = Math.floor((Math.random() * 1000) + 1); //Genera un número aleatorio entre 1 y 1000
                  if (!numeros[num]) {
                        numeros[num] = 0;
                  }
                  numeros[num] = numeros[num] + 1;
            }
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.json(numeros);
      } catch (error) {
            logger.error(`${error.message}`)
      }
});

module.exports = router;
