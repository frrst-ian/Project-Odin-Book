const db = require("../db/queries");

async function getPosts(req, res) {
    const posts = await db.getPosts();

    return res.json(posts);
}

async function getPostByID(req, res) {
    const { id } = req.params;
    const post = await db.getPostByID(parseInt(id));

    if (post === null) {
        return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
}

module.exports = { getPosts, getPostByID };
