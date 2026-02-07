const Router = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const authenticateJwt = require("../middleware/auth");

followRouter.get("/", authenticateJwt, followController.getUserFollowers);
followRouter.get("/fw", authenticateJwt, followController.getUserFollowing);
followRouter.post("/", authenticateJwt, followController.followUser);
followRouter.delete("/", authenticateJwt, followController.unFollowUser);

module.exports = followRouter;
