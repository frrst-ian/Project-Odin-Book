const Router = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const authenticateJwt = require("../middleware/auth");

followRouter.get("/follower/:id", authenticateJwt, followController.getUserFollowers);
followRouter.get("/following/:id", authenticateJwt, followController.getUserFollowing);
followRouter.get("/", authenticateJwt, followController.getCurrentUserFollowing);
followRouter.post("/", authenticateJwt, followController.followUser);
followRouter.delete("/", authenticateJwt, followController.unFollowUser);

module.exports = followRouter;
