const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const {
    loginValidator,
    registerValidator,
} = require("../validators/userValidator");

authRouter.post("/register", registerValidator, authController.postRegister);
authRouter.post("/login", loginValidator, authController.postLogin);

module.exports = authRouter;
