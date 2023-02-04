import logger from "../config/winston.config.js";
import dotenvConfig from "../config/dotenv.config.js";
import jwt from "jsonwebtoken";
import { cartService, orderService, productService } from "../services/services.js";
import orderDtoPresenter from "../dto/ordersDTO.js";


const { getAllProducts, getProductsByCategory, getProductById } = productService;
const {getByIdAndPopu } = cartService;

const viewMenuController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  let cat = req.query.category;
  let products;
  if (!cat) {
    products = await getAllProducts();
  } else {
    products = await getProductsByCategory(cat);
    if (!products) products = [];
  }
  res.render("pages/menu.ejs", { user, products });
};

const viewLoginController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  res.render("pages/login.ejs");
};

const viewRegisterController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  res.render("pages/register.ejs");
};

const viewIndexController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  res.render("pages/index.ejs");
};

const viewCartController = async (req, res) => {
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  let cart = await getByIdAndPopu(user.cart);
  let products = cart[0].products;
  products.sort((x, y) => x.product.price - y.product.price); //so that it always appears in the same order
  res.render("pages/cart.ejs", { user, products });
};

const viewErrorLoginController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  let message = "LOGIN ERROR";
  res.render("pages/errorLogin.ejs", { message });
};

const viewErrorRegisterController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  let message = "REGISTER ERROR";
  res.render("pages/errorRegister.ejs", { message });
};

const viewEnterProductController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  if (user.role === "user") return res.redirect("/menu");
  res.render("pages/enterProduct.ejs");
};

const viewModifiedProductController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  if (user.role === "user") return res.redirect("/menu");
  res.render("pages/modifiedProduct.ejs");
};

const viewProductDetailController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  let prodId = req.query.productId;
  let product = await getProductById(prodId);
  res.render("pages/productDetail.ejs", { product });
};

const viewProductDeleteController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  if (user.role === "user") return res.redirect("/menu");
  res.render("pages/deleteProduct.ejs");
};

const viewModifiedProductCodeController = async (req, res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  if (user.role === "user") return res.redirect("/menu");
  res.render("pages/modifiedProductCode.ejs");
};

const viewOrdersController = async (req,res) => {
  logger.log(
    "info",
    `request type ${req.method} en route ${req.path} ${new Date()}`
  );
  const token = req.cookies[dotenvConfig.jwt.COOKIE];
  if (!token) return res.redirect("/login");
  const user = jwt.verify(token, dotenvConfig.jwt.SECRET);
  if (user.role === "user") return res.redirect("/menu");
  let ordersDb = await orderService.getAllOrders();
  const orders = orderDtoPresenter(ordersDb)
  res.render("pages/orders.ejs", { orders });
}


export {
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
};
