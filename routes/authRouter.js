const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.post("/register", authController.postRegister);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
