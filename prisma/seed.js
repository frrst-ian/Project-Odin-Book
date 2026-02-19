const { faker } = require('@faker-js/faker')
const prisma = require("../lib/prisma.js");

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    profilePicture: faker.image.avatarGitHub(),
    bio: faker.person.bio(),
    createdAt: faker.date.recent({days:20})
  }))

  await prisma.user.createMany({ data: users })
  console.log('Seeded 10 users')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })