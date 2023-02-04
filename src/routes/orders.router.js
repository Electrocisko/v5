import { getOrdersController, saveOrderController, getByOrderNroController } from '../controllers/orders.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getOrdersController);

router.post('/', saveOrderController);

router.get('/:order', getByOrderNroController )

export default router;




