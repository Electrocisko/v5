import GenericRepository from "./GenericRepository.js";
import Cart from "../models/Cart.js";

export default class CartRepository extends GenericRepository {
  constructor(dao) {
    super(dao, Cart.model);
  }

  getAllCarts = () => {
    return this.getAll();
  };

  saveCart = (cart) => {
    return this.save(cart);
  };

  getCartById = (id) => {
    return this.getBy({ _id: id });
  };

  deleteCartById = (id) => {
    return this.delete({ _id: id });
  };

  updateCart = (id, data) => {
    return this.update({ _id: id }, { $set: data });
  };

  getByIdAndPopu = (id) => {
    return this.getByAndPopulate(
      { _id: id },
      {
        path: "products.product",
      }
    );
  };
}
