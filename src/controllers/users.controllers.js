import logger from '../config/winston.config.js';
import { ObjectId } from "mongodb";
import { userService } from '../services/services.js';

const {getUsers, getUserById, updateUser  } = userService;

const getUsersController = async (req,res) => {
    try {
        let data = await getUsers();
        return res.status(200).json(data)
    } catch (error) {
        logger.log("error", `Error in getUsersController ${error} `);
        res.status(500).send({ error: error, message: "couldnt get users" }); 
    }
};

const getUserByIdController = async (req,res) => {
try {
    const id = req.params.uid;
    if (!ObjectId.isValid(id))
    return res.status(400).send({ status: "error", error: "invalid id" });
    let result = await getUserById(id);
    if (!result)  return res.status(400).send({ status: "error", error: "user not exist" });
    res.status(200).json(result);
} catch (error) {
    logger.log("error", `Error in getUserByIdController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get user by id" }); 
}
};

const putUserContoller = async (req,res) => {
    try {
        const uid = req.params.uid;
        if (!ObjectId.isValid(uid))
        return res.status(400).send({ status: "error", error: "invalid id" });
        const newData = req.body;
        let result = await updateUser(uid,newData);
        if (result.modifiedCount === 0)  return res.status(400).send({ status: "error", error: "user not exist" });
        res.status(200).json(result);
    } catch (error) {
        logger.log("error", `Error in getUserByIdController ${error} `);
        res.status(500).send({ error: error, message: "couldnt get user by id" }); 
    }
};

export {
    getUsersController,
    getUserByIdController,
    putUserContoller
}