import Dao from "../models/Dao.js";
import UserRepository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";
import OrderRepository from "./OrderRepository.js";
import ProductRepository from "./ProductRepsitory.js";

const dao = new Dao();

export const userService = new UserRepository(dao);
export const cartService = new CartRepository(dao);
export const orderService = new OrderRepository(dao);
export const productService = new ProductRepository(dao);