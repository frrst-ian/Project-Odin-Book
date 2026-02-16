const db = require("../db/queries");

async function getPosts(req, res) {
    try {
        const posts = await db.getPosts();

        return res.json(posts);
    } catch (err) {
        console.error("Cannot get posts ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getPostByID(req, res) {
    try {
        const { id } = req.params;
        const post = await db.getPostByID(parseInt(id));

        if (post === null) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.json(post);
    } catch (err) {
        console.error("Error getting post ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function createPost(req, res) {
    try {
        const userId = parseInt(req.user.id);
        const { content } = req.body;
        const postImage = req.file?.path || null;

        const newPost = await db.createPost(content, postImage, userId);

        return res.status(201).json(newPost);
    } catch (err) {
        console.error("Error creating post ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getPostComments(req, res) {
    try {
        const { id } = req.params;
        const postComments = await db.getPostComments(parseInt(id));
        return res.json(postComments);
    } catch (err) {
        console.error("Error getting post comments", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function createComment(req, res) {
    try {
        const userId = parseInt(req.user.id);
        const { content } = req.body;
        const { id } = req.params;
        const newComment = await db.createComment(
            content,
            userId,
            parseInt(id),
        );
        return res.status(201).json(newComment);
    } catch (err) {
        console.error("Error creating comment ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function likePost(req, res) {
    try {
        const { postId } = req.body;
        const userID = parseInt(req.user.id);

        await db.likePost(parseInt(postId), userID);
        return res.json({ message: "post liked" });
    } catch (err) {
        console.error("Error creating comment ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function unLikePost(req, res) {
    try {
        const { postId } = req.body;
        const userID = parseInt(req.user.id);

        await db.unLikePost(parseInt(postId), userID);
        return res.json({ message: "post unliked" });
    } catch (err) {
        console.error("Error creating comment ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getPosts,
    getPostByID,
    createPost,
    createComment,
    getPostComments,
    likePost,
    unLikePost,
};
