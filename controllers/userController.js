const db = require("../db/queries");

async function getUsers(req, res) {
    const userID = req.user.id;
    const { searchQuery } = req.query;

    const users = await db.getUsers(searchQuery, userID);
    return res.json(users);
}

async function getUserByID(req, res) {
    const {id} = req.params;
    const user = await db.getUserByID(parseInt(id))
    return res.json(user);
}

module.exports = { getUsers, getUserByID };
