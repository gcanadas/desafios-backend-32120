const express = require ('express');
const fork = require ('child_process');
const logger = require ('../logger');

const router = express.Router();
router.get('/random/', async (req, res, next) => {
      try {
            let cont = req.query.cant || 100000000;
            const computo = fork('./controllers/calculo.js', [cont]);
            computo.on('message', (data) => {
                  computo.send('hola');
                  logger.info(`Ruta ${req.originalUrl} metodo GET`);
                  res.json(data);
            });
      } catch (error) {
            next(error);
      }
});
export default router;
