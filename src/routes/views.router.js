import { Router } from "express";
import {
  viewLoginController,
  viewMenuController,
  viewRegisterController,
  viewIndexController,
  viewCartController,
  viewErrorLoginController,
  viewErrorRegisterController,
  viewEnterProductController,
  viewModifiedProductController,
  viewProductDetailController,
  viewProductDeleteController,
  viewModifiedProductCodeController,
  viewOrdersController
} from "../controllers/views.controllers.js";

const router = new Router();

router.get("/", viewIndexController);

router.get("/register", viewRegisterController);

router.get("/login", viewLoginController);

router.get("/menu", viewMenuController);

router.get("/cart", viewCartController);

router.get('/errorlogin', viewErrorLoginController);

router.get('/errorregister', viewErrorRegisterController);

router.get('/enterproduct', viewEnterProductController);

router.get('/modifiedproduct', viewModifiedProductController);

router.get('/productdetail', viewProductDetailController);

router.get('/deleteproduct', viewProductDeleteController);

router.get('/modifiedproductcode', viewModifiedProductCodeController);

router.get('/orders', viewOrdersController);

export default router;
