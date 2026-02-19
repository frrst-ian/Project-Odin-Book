const Router = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const authenticateJwt = require("../middleware/auth");
const upload = require("../config/cloudinary");
const requireAuth = require("../middleware/requireAuth");

postRouter.get("/", authenticateJwt, postController.getPosts);
postRouter.get("/:id", authenticateJwt, postController.getPostByID);
postRouter.post(
    "/:id/c",
    authenticateJwt,
    requireAuth,
    postController.createComment,
);
postRouter.get("/:id/c", authenticateJwt, postController.getPostComments);
postRouter.post(
    "/",
    upload.single("postImage"),
    authenticateJwt,
    requireAuth,
    postController.createPost,
);
postRouter.post("/l", authenticateJwt, requireAuth, postController.likePost);
postRouter.delete(
    "/ul",
    authenticateJwt,
    requireAuth,
    postController.unLikePost,
);

module.exports = postRouter;
