import { Router } from 'express';
import routesController from '../controllers/routes.controller.js';

const router = Router();


router.get('/', (res) => {
      routesController.productTest(res);
});

export default router;