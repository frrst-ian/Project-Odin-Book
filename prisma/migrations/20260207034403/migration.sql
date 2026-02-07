/*
  Warnings:

  - You are about to drop the `follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followedById_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followingId_fkey";

-- DropTable
DROP TABLE "follow";

-- CreateTable
CREATE TABLE "follows" (
    "followedById" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("followedById","followingId")
);

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
