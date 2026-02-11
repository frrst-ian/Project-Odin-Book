const Router = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const authenticateJwt = require("../middleware/auth");

followRouter.get("/:id", authenticateJwt, followController.getUserFollowers);
followRouter.get("/", authenticateJwt, followController.getUserFollowing);
followRouter.post("/", authenticateJwt, followController.followUser);
followRouter.delete("/", authenticateJwt, followController.unFollowUser);

module.exports = followRouter;
