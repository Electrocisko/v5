import mongoose from "mongoose";
import Cart from "./Cart.js";
import Order from "./Order.js";
import Product from "./Product.js";
import User from "./User.js";
import dotenvConfig from "../config/dotenv.config.js";

const MONGO_URL = dotenvConfig.mongo.MONGO_URL;

export default class Dao {
  constructor() {
    this.connection = mongoose.connect(MONGO_URL);
    const timestamps = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    const userSchema = mongoose.Schema(User.schema, timestamps);
    const cartSchema = mongoose.Schema(Cart.schema, timestamps);
    const orderSchema = mongoose.Schema(Order.schema, timestamps);
    const productSchema = mongoose.Schema(Product.schema, timestamps);

    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
      [Order.model]: mongoose.model(Order.model, orderSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
    };
  }

  getAll = (params, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].find(params);
  };

  find = (params, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].find(params);
  };

  findOne = (params, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].findOne(params);
  };

  save = (document, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].create(document);
  };

  delete = (params, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].deleteOne(params);
  };

  update = (id, data, entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].updateOne(id, data);
  };

  last = (entity) => {
    if (!this.models[entity]) throw new Error("Entity does not exist");
    return this.models[entity].find().sort({ $natural: -1 }).limit(1);
  };
}
