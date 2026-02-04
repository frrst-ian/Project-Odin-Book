const Router = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const authenticateJwt = require("../middleware/auth")

postRouter.get("/",authenticateJwt, postController.getPosts);
postRouter.get("/:id",authenticateJwt, postController.getPostByID);

module.exports = postRouter;
