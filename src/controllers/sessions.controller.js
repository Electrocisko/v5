import logger from "../config/winston.config.js";
import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";
import UserDtoPresenter from "../dto/userDTO.js";

const registerController = async (req, res) => {
  try {
    res.send({
      status: "success",
      payload: req.user,
    });
  } catch (error) {
    logger.log("error", `Error in  registerController ${error} `);
    res.status(500).send({ error: error, message: "couldnt register user" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { name, _id, cart, imageUrl } = req.user;
    const loginUser = UserDtoPresenter(req.user)
    if (
      email === dotenvConfig.session.ADMIN_EMAIL &&
      password === dotenvConfig.session.ADMIN_PWD
    ) {
      const sessionAdminUser = {
        name: name,
        role: "admin",
        imageUrl,
        email,
        id: _id,
        cart: cart,
      };
      const tokenAdmin = jwt.sign(sessionAdminUser, dotenvConfig.jwt.SECRET, {
        expiresIn: '1h',
      });
      return res
        .cookie(dotenvConfig.jwt.COOKIE, tokenAdmin, { maxAge: 3600000 })
        .send(req.user);
    }
    const token = jwt.sign(loginUser, dotenvConfig.jwt.SECRET, {
      expiresIn: 600,
    });
    res
      .cookie(dotenvConfig.jwt.COOKIE, token, {
        maxAge: 600000,
        httpOnly: true,
      })
      .send(req.user);
  } catch (error) {
    logger.log("error", `Error in  loginController ${error} `);
    res.status(500).send({ error: error, message: "couldnt login user" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie(dotenvConfig.jwt.COOKIE).redirect("/login");
  } catch (error) {
    logger.log("error", `Error in  logoutController ${error} `);
    res.status(500).send({ error: error, message: "couldnt logout user" });
  }
};

const loginFailControler = async (req, res) => {
  res.status(400).send({ status: "error", message: "user login error" });
};

const registerFailControler = async (req, res) => {
  res.status(400).send({ status: "error", message: "user registration error" });
};

export {
  registerController,
  loginController,
  logoutController,
  loginFailControler,
  registerFailControler,
};
