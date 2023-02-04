import logger from "../config/winston.config.js";
import { ObjectId } from "mongodb";
import { productService } from "../services/services.js";

const {
  getAllProducts,
  saveProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  getProductsByCategory,
  getProductByCode,
  updateProductByCode,
} = productService;

const getProductsController = async (req, res) => {
  try {
    let data = await getAllProducts();
    return res.status(200).json(data);
  } catch (error) {
    logger.log("error", `Error in getProductsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get products" });
  }
};

const postProductsController = async (req, res) => {
  const data = req.body;
  try {
    if (!req.file) {
      data.thumbnail = "noimage2.jpg";
    } else {
      data.thumbnail = req.file.filename;
    }
    if (
      !data.name ||
      !data.description ||
      !data.category ||
      !data.code ||
      !data.price ||
      !data.stock
    )
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    let existCode = await getProductByCode(data.code);
    if (!existCode) {
      await saveProducts(data);
      res.status(201).send({ status: "succes", payload: data });
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Repetead Code" });
    }
  } catch (error) {
    logger.log("error", `Error in PostProductsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt save products" });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", message: "invalid id" });
    let data = await getProductById(pid);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", message: "nonexistent product" });
    else {
      return res.status(200).json(data);
    }
  } catch (error) {
    logger.log("error", `Error in getProductByIdController ${error} `);
    res.status(500).send({ error: error, message: "Couldnt get product" });
  }
};

const deleteProductByIdControler = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });
    let data = await deleteProductById(pid);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent product" });
    return res.status(200).send({ status: "succes", data });
  } catch (error) {
    logger.log("error", `Error in deleteProductByIdController ${error} `);
    res.status(500).send({ error: error, message: "Couldnt delete product" });
  }
};

const updateProductControler = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", message: "invalid id" });
    let newData = req.body;
    if (req.file !== undefined) {
      newData.thumbnail = req.file.filename;
    }
    //validations so that product code is not repeated
    let originalCode = await getProductById(pid);
    let newCode = await getProductByCode(req.body.code);
    if (newCode?.code && newCode?.code !== originalCode.code)
      return res
        .status(400)
        .send({ status: "error", message: "Repetead Code" });
    let result = await updateProduct(pid, newData);
    if (result.modifiedCount === 0)
      return res
        .status(400)
        .send({ status: "error", message: "nonexistent product" });
    else {
      return res.status(201).send({
        message: "Modified product",
        status: result,
      });
    }
  } catch (error) {
    logger.log("error", `Error in updateProductController ${error} `);
    res.status(500).send({ error: error, message: "couldnt update product" });
  }
};

const getProductsByCategoryController = async (req, res) => {
  let cat = req.params.cat;
  let result = await getProductsByCategory(cat);
  if (result.length === 0)
    return res.status(400).send({
      status: "error",
      message: "non-existent product in category or category non-existent",
    });
  return res.status(200).json(result);
};

const getProductByCodeController = async (req, res) => {
  try {
    let code = req.params.code;
    let data = await getProductByCode(code);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", message: "nonexistent product" });
    else {
      return res.status(200).json(data);
    }
  } catch (error) {
    logger.log("error", `Error in getProductByIdController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get product" });
  }
};

const updateProductByCodeController = async (req, res) => {
  try {
    let code = req.params.code;
    let newData = req.body;
    if (req.file !== undefined) {
      newData.thumbnail = req.file.filename;
    }
    //validations so that product code is not repeated
    let existCode = await getProductByCode(req.body.code);
    if (existCode.code && existCode.code !== code)
      return res
        .status(400)
        .send({ status: "error", message: "Repetead Code" });
    let result = await updateProductByCode(code, newData);
    if (result.modifiedCount === 0)
      return res
        .status(400)
        .send({ status: "error", message: "Nonexistent product" });
    else {
      return res.status(201).send({
        message: "Modified product",
        status: result,
      });
    }
  } catch (error) {
    logger.log("error", `Error in updateProductByCodeController ${error} `);
    res.status(500).send({ error: error, message: "couldnt update product" });
  }
};

export {
  getProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdControler,
  updateProductControler,
  getProductsByCategoryController,
  getProductByCodeController,
  updateProductByCodeController,
};
