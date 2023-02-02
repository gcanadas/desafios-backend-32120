import { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();


router.get('/productos', productController.getAll);
router.get('/productos/:id', productController.getById);
router.post('/productos', productController.save);
router.put('/productos', productController.updateById);
router.delete('/productos/:id', productController.deleteById);
router.delete('/productos/', productController.deleteAll);


export default router;