const Router = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const authenticateJwt = require("../middleware/auth")

userRouter.get("/",authenticateJwt, userController.getUsers);
userRouter.get("/:id",authenticateJwt, userController.getUserByID);


module.exports = userRouter;
