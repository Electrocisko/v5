import mongoose from "mongoose";

export default class User {
  static get model() {
    return "users";
  }

  static get schema() {
    return {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      address: { type: String, required: true },
      age: { type: Number, required: true },
      phoneNumber: { type: String, required: true },
      imageUrl: { type: String },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "carts",
      },
    };
  }
}
