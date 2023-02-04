import GenericRepository from "./GenericRepository.js";
import Product from "../models/Product.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao) {
       super(dao,Product.model) 
    }

    getAllProducts = () => {
        return this.getAll();
    }

    saveProducts = (product) => {
        return this.save(product)
    }

    getProductById = (id) => {
        return this.getBy({ _id: id })
    }

    deleteProductById = (id) => {
        return this.delete({ _id: id })
    }

    updateProduct = (id, modifiedProduct) => {
        return this.update(
            { _id: id },
            { $set: modifiedProduct })
    }

    getProductsByCategory = (cat) => {
        return this.getAll({ category: cat })
    }

    getProductByCode = (code) => {
        return this.getBy({code: code})
    }

    updateProductByCode = (code, modifiedProduct) => {
        return this.update(
            { code: code },
            { $set: modifiedProduct })
    }

}
