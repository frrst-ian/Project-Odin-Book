const db = require("../db/queries")

async function getUsers(req, res) {
    const userID = req.user.id;
    const { searchQuery } = req.query;

    const users = await db.getUsers(searchQuery, userID);
    console.log("Users:", users)
    return res.json(users);
}

module.exports = { getUsers };
