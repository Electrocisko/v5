import { Router } from 'express';
import {getUsersController , getUserByIdController, putUserContoller } from '../controllers/users.controllers.js'

const router = new Router();

router.get('/',getUsersController);

router.get('/:uid', getUserByIdController);

router.put('/:uid',putUserContoller);



export default router;