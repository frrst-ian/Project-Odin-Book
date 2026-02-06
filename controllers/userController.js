const db = require("../db/queries");

async function getUserProfile(req, res) {
    if (req.user) {
        console.log("User: ", req.user);
        return res.json(req.user);
    }
}

async function getUsers(req, res) {
    const userID = req.user.id;
    const { searchQuery } = req.query;

    const users = await db.getUsers(searchQuery, userID);
    return res.json(users);
}

async function getUserByID(req, res) {
    const { id } = req.params;
    const user = await db.getUserByID(parseInt(id));
    if (user === null) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    return res.json(user);
}

module.exports = { getUsers, getUserByID, getUserProfile };
