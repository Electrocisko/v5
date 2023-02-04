import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  loginFailControler,
  registerFailControler
} from "../controllers/sessions.controller.js";
import { mailRegisterController } from '../controllers/messages.controllers.js'
import upLoader from "../helpers/storageImg.js";
import passport from "passport";

const router = new Router();

router.post(
  "/register",
  upLoader.single("imageUrl"),
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/registerfail",
    passReqToCallback: true,
  }),
  mailRegisterController,
  registerController
);


router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/loginfail",
  }),
  loginController
);

router.get("/logout", logoutController);

router.get("/loginfail",loginFailControler );

router.get("/registerfail", registerFailControler );

export default router;
