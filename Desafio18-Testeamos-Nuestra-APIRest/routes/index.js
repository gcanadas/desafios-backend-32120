import { Router } from 'express';

import product from './product.js'

const router = Router();

router.use('/', product);

export default router;