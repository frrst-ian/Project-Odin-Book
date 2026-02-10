const prisma = require("../lib/prisma.js");

async function createUser(name, email, password, bio, profilePicture) {
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            bio: bio,
            profilePicture: profilePicture,
        },
    });
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

async function getUserByID(id) {
    return await prisma.user.findUnique({
        where: { id: id },
        select: { id: true, name: true, profilePicture: true, bio: true },
    });
}

async function getUsers(searchQuery, userID) {
    return await prisma.user.findMany({
        where: {
            id: { not: userID },
            name: { contains: searchQuery, mode: "insensitive" },
        },
        select: {
            id: true,
            name: true,
            profilePicture: true,
            following: true,
            followedBy: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}

async function getPosts() {
    return await prisma.post.findMany({
        include: { likes: true, comments: true },
    });
}

async function getPostByID(postID) {
    return await prisma.post.findUnique({
        where: { id: postID },
        include: {
            _count: { select: { likes: true } },
            comments: true,
            author: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profilePicture: true,
                },
            },
        },
    });
}

async function createPost(content, postImage, userID) {
    return await prisma.post.create({
        data: {
            content: content,
            postImage: postImage,
            authorId: userID,
        },
    });
}

async function createComment(content, userID, postID) {
    return await prisma.comment.create({
        data: {
            content,
            authorId: userID,
            postId: postID,
        },
    });
}

async function getPostComments(postID) {
    return await prisma.comment.findMany({
        where: { postId: postID },
        include: {
            author: {
                select: {
                    name: true,
                    profilePicture: true,
                },
            },
        },
    });
}

async function getUserFollowers(userID) {
    return await prisma.user.findMany({
        where: { id: userID },
        include: {
            followedBy: {
                select: {
                    followedBy: {
                        select: {
                            id:true,
                            email: false,
                            password: false,
                            bio: false,
                            createdAt: false,
                            name: true,
                            profilePicture: true,
                        },
                    },
                },
            },
            email: false,
            password: false,
            bio: false,
            createdAt: false,
            name: false,
            id: false,
            profilePicture: false,
        },
    });
}

async function getUserFollowing(userID) {
    return await prisma.user.findMany({
        where: { id: userID },
        include: {
            following: {
                select: {
                    following: {
                        select: {
                            id:true,
                            email: false,
                            password: false,
                            bio: false,
                            createdAt: false,
                            name: true,
                            profilePicture: true,
                        },
                    },
                },
            },
            email: false,
            password: false,
            bio: false,
            createdAt: false,
            name: false,
            id: false,
            profilePicture: false,
        },
    });
}

async function followUser(userID, otherUserID) {
    return await prisma.follows.create({
        data: {
            followedById: userID,
            followingId: otherUserID,
        },
    });
}

async function unFollowUser(userID, otherUserID) {
    return await prisma.follows.deleteMany({
        where: {
            followedById: userID,
            followingId: otherUserID,
        },
    });
}

async function likePost(postID, userID) {
    return await prisma.like.create({
        data: {
            postId: postID,
            userId: userID,
        },
    });
}

async function unLikePost(postID, userID) {
    return await prisma.like.deleteMany({
        where: {
            postId: postID,
            userId: userID,
        },
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserByID,
    getUsers,
    getPosts,
    getPostByID,
    createPost,
    createComment,
    getPostComments,
    getUserFollowers,
    getUserFollowing,
    followUser,
    unFollowUser,
    unLikePost,
    likePost,
};
