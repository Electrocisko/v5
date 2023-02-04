import { Router } from "express";
import {
  getCartsController,
  postCartsController,
  getCartByIdController,
  deleteCartByIdControler,
  addProductInCartContoller,
  getProductsInCartController,
  deletteAllProductsInCartController,
  subtractProductInCartController,
  deleteProductByIdInCartController
} from "../controllers/carts.controllers.js";

const router = new Router();

router.get('/',getCartsController);

router.post('/',postCartsController);

router.get('/:cid',getCartByIdController);

router.delete('/:cid',deleteCartByIdControler);

router.put('/:cid',deletteAllProductsInCartController);

router.get("/:cid/products", getProductsInCartController );

router.put("/:cid/products", addProductInCartContoller );

router.put('/:cid/subtract', subtractProductInCartController);

router.put('/:cid/deleteproduct', deleteProductByIdInCartController);

export default router;