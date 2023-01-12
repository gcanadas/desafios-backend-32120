import { Router } from 'express';
//import fork from 'child_process';
import logger from '../logger.js';
import routesController from '../controllers/routes.controller.js';

const router = Router();
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

router.get('/', async (req, res) => {
      routesController.routeRandom(req, res);
});

export default router;
