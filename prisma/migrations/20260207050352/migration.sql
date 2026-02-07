/*
  Warnings:

  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `follows` table. All the data in the column will be lost.
  - Made the column `followedById` on table `follows` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followingId` on table `follows` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followedById_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- DropIndex
DROP INDEX "follows_followedById_followingId_key";

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
DROP COLUMN "id",
ALTER COLUMN "followedById" SET NOT NULL,
ALTER COLUMN "followingId" SET NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("followedById", "followingId");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
