const db = require("../db/queries");

async function getUserFollowers(req, res) {
    try {
        const { id } = req.user;
        const followers = await db.getUserFollowers(parseInt(id));

        return res.json(followers);
    } catch (err) {
        console.error("Error getting followers: ", err);

        return res.status(500).json("Internal Server Error");
    }
}

async function getUserFollowing(req, res) {
    try {
        const { id } = req.user;
        const following = await db.getUserFollowing(parseInt(id));

        return res.json(following);
    } catch (err) {
        console.error("Error getting following: ", err);

        return res.status(500).json("Internal Server Error");
    }
}

async function followUser(req, res) {
    try {
        const { id } = req.user;
        const { followedUserID } = req.body;
        const follow = await db.followUser(parseInt(id), followedUserID);
        return res.json(follow);
    } catch (err) {
        console.error("Error getting following: ", err);
        return res.status(500).json("Internal Server Error");
    }
}

async function unFollowUser(req, res) {
    try {
        const { id } = req.user;
        const { followedUserID } = req.body;
        const follow = await db.unFollowUser(parseInt(id), followedUserID);
        return res.json(follow);
    } catch (err) {
        console.error("Error getting following: ", err);
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    getUserFollowers,
    getUserFollowing,
    followUser,
    unFollowUser,
};
