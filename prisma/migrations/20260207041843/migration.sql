/*
  Warnings:

  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[followedById,followingId]` on the table `follows` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followedById_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "followedById" DROP NOT NULL,
ALTER COLUMN "followingId" DROP NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "follows_followedById_followingId_key" ON "follows"("followedById", "followingId");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
