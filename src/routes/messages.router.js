import { Router } from 'express';
import { mailOrderController, mailRegisterController } from '../controllers/messages.controllers.js'

const router = Router();

router.post('/mail/order', mailOrderController )

router.get('/mail/register',mailRegisterController)

export default router;

