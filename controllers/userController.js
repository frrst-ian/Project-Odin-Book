const db = require("../db/queries");

async function getUserProfile(req, res) {
    try {
        if (req.user) {
            return res.json(req.user);
        }
    } catch (err) {
        console.error("Error getting user profile ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getUsers(req, res) {
    try {
        const userID = req.user.id;
        const { searchQuery } = req.query;

        const users = await db.getUsers(searchQuery, userID);
        return res.json(users);
    } catch (err) {
        console.error("Error getting post ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getUserByID(req, res) {
    try {
        const { id } = req.params;
        const user = await db.getUserByID(parseInt(id));
        if (user === null) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        return res.json(user);
    } catch (err) {
        console.error("Error getting post ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getUsers, getUserByID, getUserProfile };
