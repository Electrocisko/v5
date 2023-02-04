import logger from "../config/winston.config.js";
import { orderService } from "../services/services.js";

const { getAllOrders, saveOrder, getLastOrder, delleteAllOrders } = orderService;

const getOrdersController = async (req, res) => {
  try {
    let result = await getAllOrders();
    return res.status(200).send(result);
  } catch (error) {
    logger.log("error", `Error in getOrdersController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get orders" });
  }
};

const saveOrderController = async (req, res) => {
  try {
    const order = req.body;
    let counter = await getLastOrder();
    counter.length === 0 ? order.orderNro = 1 : order.orderNro = counter[0].orderNro + 1;
    let result = await saveOrder(order);
    return res.status(200).send(result);
  } catch (error) {
    logger.log("error", `Error in saveOrderController ${error} `);
    res.status(500).send({ error: error, message: "couldnt save order" });
  }
};

const getByOrderNroController = async (req, res) => {
  try {
    const { order } = req.params;
    let data = await getOrderByNro(order);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent order" });
    return res.status(200).send(data);
  } catch (error) {
    logger.log("error", `Error in getByOrderNroController ${error} `);
    res
      .status(500)
      .send({ error: error, message: "couldnt get order by Number" });
  }
};

const delleteAllOrdersController = async (req, res) => {
  try {
    let data = await delleteAllOrders();
    return res.status(200).send(data);
  } catch (error) {
    logger.log("error", `Error in delleteAllOrdersController ${error} `);
    res
      .status(500)
      .send({ error: error, message: "couldnt delete all orders" });
  }
};

export {
  getOrdersController,
  saveOrderController,
  getByOrderNroController,
  delleteAllOrdersController,
};
