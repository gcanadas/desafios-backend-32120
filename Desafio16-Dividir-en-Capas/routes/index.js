import { Router } from 'express';

import product from './product.js'
import productTest from './productTest.js';
import random from './random.js'

const router = Router();

router.use('/', product);
router.use('/productos-test', productTest);
router.use('/api/randoms', random);

export default router;