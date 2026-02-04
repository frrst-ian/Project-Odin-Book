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
        select: { id: true, name: true, profilePicture: true },
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
        include: { likes: true, comments: true },
    });
}

async function getCommentsByPostID() {}

async function getLikesByPostID() {}

async function getUserFollowersByID() {}

module.exports = {
    createUser,
    getUserByEmail,
    getUserByID,
    getUsers,
    getPosts,
    getPostByID,
};
