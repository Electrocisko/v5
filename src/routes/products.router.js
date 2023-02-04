import { Router } from "express";
import {
  getProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdControler,
  updateProductControler,
  getProductsByCategoryController,
  getProductByCodeController,
  updateProductByCodeController
} from "../controllers/products.controllers.js";
import upLoader from '../helpers/storageImg.js';

const router = new Router();

router.get("/",getProductsController);

router.post("/", upLoader.single('thumbnail') ,postProductsController);

router.get("/:pid", getProductByIdController);

router.delete("/:pid", deleteProductByIdControler);

router.put("/:pid", upLoader.single('thumbnail'), updateProductControler);

router.get('/categorys/:cat', getProductsByCategoryController);

router.get('/code/:code', getProductByCodeController);

router.put('/code/:code', upLoader.single('thumbnail'), updateProductByCodeController);


export default router;
