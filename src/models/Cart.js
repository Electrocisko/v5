import mongoose from "mongoose";

export default class Cart {
  static get model() {
    return "carts";
  }

  static get schema() {
    return {
      products: [
        {
          product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number,
          },
        },
      ],
    };
  }
}
