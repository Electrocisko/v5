import GenericRepository from "./GenericRepository.js";
import Order from "../models/Order.js";

export default class OrderRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Order.model)
    }

    getAllOrders = () => {
        return this.getAll();
    }

    saveOrder = (order) => {
        return this.save(order)
    }

    getLastOrder = () => {
        return this.getLast();
    }

    getOrderByNro = (order) => {
        return this.getBy({ orderNro: order })
    }

    delleteAllOrders = () => {
        return this.drop()
    }

}