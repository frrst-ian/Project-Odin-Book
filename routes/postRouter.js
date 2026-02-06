const Router = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const authenticateJwt = require("../middleware/auth");
const upload = require("../config/cloudinary");

postRouter.get("/", authenticateJwt, postController.getPosts);
postRouter.get("/:id", authenticateJwt, postController.getPostByID);
postRouter.post("/:id/c", authenticateJwt, postController.createComment);
postRouter.get("/:id/c", authenticateJwt, postController.getPostComments);
postRouter.post(
    "/",
    upload.single("postImage"),
    authenticateJwt,
    postController.createPost,
);

module.exports = postRouter;
