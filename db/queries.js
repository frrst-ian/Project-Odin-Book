const prisma = require("../lib/prisma.js");

async function createUser(name, email, password) {
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

async function getUserById(id) {
    return await prisma.user.findUnique({ where: { id: id } });
}

async function getUsers(searchQuery, userID) {
    return await prisma.user.findMany({
        where: {
            id: { not: userID },
            name: { contains: searchQuery, mode: "insensitive" },
        },
        select: { name: true, profilePicture: true },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}

async function getAllPost() {}

async function getPostByUserID() {}

async function getPostByID() {}

async function getCommentsByPostID() {}

async function getLikesByPostID() {}

async function getUserFollowersByID() {}

module.exports = { createUser, getUserByEmail, getUserById, getUsers };
